#!/usr/bin/env python3
"""
Auto-complete iOS App Store submission for LUNA.
Polls until App Privacy is published, then submits for review.
Run this script, then publish App Privacy in ASC:
  https://appstoreconnect.apple.com/apps/6760126548/distribution/privacy
"""
import jwt, time, requests, json, sys
from pathlib import Path

KEY_ID = '48GLJZYX5K'
ISSUER_ID = '69a6de74-3cdf-47e3-e053-5b8c7c11a4d1'
VERSION_ID = 'db3dba64-1c0a-4eb5-9d71-a27a4a4b72c1'
SUBMISSION_ID = '6d571940-0e44-4d24-b4c3-d57f51cf33e8'
KEY_PATH = Path.home() / '.appstoreconnect/private_keys/AuthKey_48GLJZYX5K.p8'
BASE = 'https://api.appstoreconnect.apple.com'

token_cache = {'tok': None, 'exp': 0}

def make_token():
    now = int(time.time())
    if token_cache['tok'] and token_cache['exp'] > now + 60:
        return token_cache['tok']
    key = KEY_PATH.read_text()
    tok = jwt.encode({'iss':ISSUER_ID,'iat':now,'exp':now+1200,'aud':'appstoreconnect-v1'},
        key, algorithm='ES256', headers={'kid':KEY_ID})
    token_cache.update({'tok':tok,'exp':now+1200})
    return tok

def api(method, path, body=None):
    h = {'Authorization': f'Bearer {make_token()}', 'Content-Type': 'application/json'}
    r = requests.request(method, f'{BASE}{path}', headers=h, json=body, timeout=30)
    try: return r.status_code, r.json()
    except: return r.status_code, {}

def try_add_version_to_submission():
    """Returns (success, errors)"""
    item_body = {"data": {
        "type": "reviewSubmissionItems",
        "relationships": {
            "appStoreVersion": {"data": {"type": "appStoreVersions", "id": VERSION_ID}},
            "reviewSubmission": {"data": {"type": "reviewSubmissions", "id": SUBMISSION_ID}}
        }
    }}
    c, d = api('POST', '/v1/reviewSubmissionItems', item_body)
    if c in (200, 201):
        return True, [], d['data']['id']
    elif c == 409:
        errs = d.get('errors', [])
        assoc_errors = {}
        for e in errs:
            assoc = e.get('meta', {}).get('associatedErrors', {})
            assoc_errors.update(assoc)
        return False, assoc_errors, None
    return False, {f'HTTP_{c}': str(d)[:100]}, None

def submit_for_review(item_id=None):
    """Submit the review submission"""
    # If we have an item, try submitting  
    patch_body = {"data": {
        "type": "reviewSubmissions",
        "id": SUBMISSION_ID,
        "attributes": {"submitted": True}
    }}
    c, d = api('PATCH', f'/v1/reviewSubmissions/{SUBMISSION_ID}', patch_body)
    return c, d

print('=' * 60)
print('LUNA iOS App Store - Auto-Submission Script')
print('=' * 60)
print()
print('ACTION REQUIRED: Publish App Privacy in ASC')
print('  1. Open: https://appstoreconnect.apple.com/apps/6760126548/distribution/privacy')
print('  2. Click "Modifier" or "Commencer"')  
print('  3. Answer "NON" to data collection')
print('  4. Click "Publier"')
print()
print('This script polls every 30s until App Privacy is published...')
print()

max_attempts = 60  # 30 minutes
attempt = 0

while attempt < max_attempts:
    attempt += 1
    print(f'[{attempt}/{max_attempts}] Checking submission state...', end=' ', flush=True)
    
    success, errors, item_id = try_add_version_to_submission()
    
    if success:
        print('VERSION ADDED TO SUBMISSION!')
        print()
        print('Submitting for review...')
        sc, sd = submit_for_review(item_id)
        print(f'Submit response: {sc}')
        if sc in (200, 201):
            sub_state = sd.get('data', {}).get('attributes', {})
            print(f'Submission state: {sub_state}')
            print()
            print('SUCCESS! App submitted for App Store review.')
            sys.exit(0)
        else:
            print(f'Submit error: {sd}')
            sys.exit(1)
    else:
        # Check if privacy is the only error
        all_codes = []
        for path_errs in errors.values():
            for e in path_errs:
                all_codes.append(e.get('code', e) if isinstance(e, dict) else str(e))
        
        if any('DATA_USAGES' in str(c) for c in all_codes):
            print('Waiting for App Privacy to be published...')
        elif any('SCREENSHOT' in str(c) for c in all_codes):
            print(f'Screenshot error! {all_codes}')
            sys.exit(1)
        else:
            print(f'Unknown error: {all_codes}')
        
        time.sleep(30)

print('Timeout: App Privacy not published within 30 minutes')
sys.exit(1)
