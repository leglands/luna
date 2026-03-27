#!/usr/bin/env python3
"""
gen_ios_metadata.py

Generates iOS App Store Connect metadata for the shipped App Store locales.
Sources content from existing store metadata.
Maps source locale codes → iOS ASC locale codes.
Also copies screenshots from en-US to the shipped locale folders.
"""

import os
import shutil

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IOS_META = os.path.join(BASE, 'fastlane', 'metadata', 'ios')
AND_META = os.path.join(BASE, 'fastlane', 'metadata', 'android')
IOS_SS = os.path.join(BASE, 'fastlane', 'screenshots', 'ios')
EN_SS = os.path.join(IOS_SS, 'en-US')

# Source metadata locale → shipped iOS ASC locale
IOS_METADATA_SOURCES = {
    'en-US': 'en-US',
    'fr-FR': 'fr-FR',
}

# Translated subtitles per iOS locale (max 30 chars)
SUBTITLES = {
    'ar-SA': 'خاص. مشفر. بدون خادم.',
    'bg': 'Лично. Криптирано. Без сървър.',
    'cs': 'Soukromé. Šifrované. Bez serveru.',
    'da': 'Privat. Krypteret. Ingen server.',
    'de-DE': 'Privat. Verschlüsselt. Ohne Server.',
    'el': 'Ιδιωτικό. Κρυπτογραφημένο.',
    'en-US': 'Private. Encrypted. No server.',
    'es-MX': 'Privado. Cifrado. Sin servidor.',
    'es-ES': 'Privado. Cifrado. Sin servidor.',
    'fi': 'Yksityinen. Salattu. Ei palvelinta.',
    'fr-CA': 'Privé. Chiffré. Sans serveur.',
    'fr-FR': 'Privé. Chiffré. Sans serveur.',
    'he': 'פרטי. מוצפן. ללא שרת.',
    'hi': 'निजी. एन्क्रिप्टेड. कोई सर्वर नहीं.',
    'hr': 'Privatno. Šifrirano. Bez servera.',
    'hu': 'Privát. Titkosított. Szerver nélkül.',
    'id': 'Pribadi. Terenkripsi. Tanpa server.',
    'it': 'Privato. Crittografato. No server.',
    'ja': 'プライベート。暗号化。サーバーなし。',
    'ko': '개인적. 암호화. 서버 없음.',
    'ms': 'Peribadi. Dienkripsi. Tanpa pelayan.',
    'nl-NL': 'Privé. Versleuteld. Geen server.',
    'no': 'Privat. Kryptert. Ingen server.',
    'pl': 'Prywatne. Zaszyfrowane. Bez serwera.',
    'pt-BR': 'Privado. Criptografado. Sem servidor.',
    'pt-PT': 'Privado. Encriptado. Sem servidor.',
    'ro': 'Privat. Criptat. Fără server.',
    'ru': 'Приватно. Зашифровано. Без сервера.',
    'sk': 'Súkromné. Šifrované. Bez servera.',
    'sv': 'Privat. Krypterat. Ingen server.',
    'th': 'ส่วนตัว. เข้ารหัส. ไม่มีเซิร์ฟเวอร์.',
    'tr': 'Özel. Şifreli. Sunucu yok.',
    'uk': 'Приватно. Зашифровано. Без сервера.',
    'vi': 'Riêng tư. Mã hóa. Không có máy chủ.',
    'zh-Hans':'私密。加密。无服务器。',
    'zh-Hant':'私密。加密。無伺服器。',
}

# Translated keywords per iOS locale (max 100 chars total)
KEYWORDS = {
    'ar-SA': 'تتبع الدورة,الخصوبة,الإباضة,الخصوصية,مشفر,غير متصل,صحة المرأة',
    'bg': 'цикъл,менструация,плодовитост,овулация,поверителност,офлайн',
    'cs': 'cyklus,menstruace,fertilita,ovulace,soukromí,offline,šifrování',
    'da': 'cyklus,menstruation,fertilitet,ægløsning,privatliv,offline',
    'de-DE': 'Zyklus-Tracker,Menstruation,Fruchtbarkeit,Eisprung,BBT,Datenschutz,offline',
    'el': 'κύκλος,εμμηνόρρυση,γονιμότητα,ωορρηξία,απόρρητο,εκτός σύνδεσης',
    'en-US': 'period tracker,cycle,fertility,ovulation,BBT,privacy,offline,encrypted,menstrual,health',
    'es-MX': 'ciclo,período,fertilidad,ovulación,privacidad,offline,cifrado,salud',
    'es-ES': 'ciclo,reglas,fertilidad,ovulación,temperatura basal,privacidad,offline,cifrado',
    'fi': 'sykli,kuukautiset,hedelmällisyys,ovulaatio,yksityisyys,offline',
    'fr-CA': 'cycle,menstruations,fertilité,ovulation,confidentialité,hors ligne',
    'fr-FR': 'cycle menstruel,règles,fertilité,ovulation,TTB,confidentialité,hors ligne,chiffré',
    'he': 'מחזור,פוריות,ביוץ,פרטיות,מוצפן,בלי אינטרנט,בריאות',
    'hi': 'मासिक धर्म,चक्र,प्रजनन,ओवुलेशन,गोपनीयता,ऑफलाइन,स्वास्थ्य',
    'hr': 'ciklus,menstruacija,plodnost,ovulacija,privatnost,offline',
    'hu': 'ciklus,menstruáció,termékenység,ovuláció,adatvédelem,offline',
    'id': 'siklus,menstruasi,kesuburan,ovulasi,privasi,offline,terenkripsi',
    'it': 'ciclo,mestruazione,fertilità,ovulazione,BBT,privacy,offline,crittografato',
    'ja': '生理周期,月経,排卵,基礎体温,妊活,プライバシー,オフライン,暗号化',
    'ko': '생리주기,월경,배란,기초체온,임신준비,개인정보,오프라인,암호화',
    'ms': 'kitaran,haid,kesuburan,ovulasi,privasi,offline,terenkripsi',
    'nl-NL': 'cyclus,menstruatie,vruchtbaarheid,ovulatie,privacy,offline,versleuteld',
    'no': 'syklus,menstruasjon,fruktbarhet,eggløsning,personvern,offline',
    'pl': 'cykl,miesiączka,płodność,owulacja,BBT,prywatność,offline,szyfrowanie',
    'pt-BR': 'ciclo,menstruação,fertilidade,ovulação,BBT,privacidade,offline,criptografado',
    'pt-PT': 'ciclo,menstruação,fertilidade,ovulação,privacidade,offline,encriptado',
    'ro': 'ciclu,menstruație,fertilitate,ovulație,confidențialitate,offline',
    'ru': 'цикл,менструация,фертильность,овуляция,конфиденциальность,офлайн,шифрование',
    'sk': 'cyklus,menštruácia,fertilita,ovulácia,súkromie,offline',
    'sv': 'cykel,menstruation,fertilitet,ägglossning,integritet,offline',
    'th': 'รอบเดือน,ประจำเดือน,การตกไข่,ความเป็นส่วนตัว,ออฟไลน์,เข้ารหัส',
    'tr': 'döngü,adet,doğurganlık,yumurtlama,gizlilik,çevrimdışı,şifreli',
    'uk': 'цикл,менструація,фертильність,овуляція,конфіденційність,офлайн',
    'vi': 'chu kỳ,kinh nguyệt,sinh sản,rụng trứng,quyền riêng tư,ngoại tuyến',
    'zh-Hans':'月经周期,排卵,基础体温,备孕,隐私保护,离线,加密,健康',
    'zh-Hant':'月經週期,排卵,基礎體溫,備孕,隱私保護,離線,加密,健康',
}

# Translated promotional text per iOS locale (max 170 chars) - using Android short_description as base
PROMO_TEXT = {
    'ar-SA': 'تتبعي دورتك بخصوصية تامة. AES-256 مشفر. بدون سحابة. بدون تتبع. بياناتك على هاتفك دائماً.',
    'bg': 'Проследявайте цикъла си с пълна поверителност. AES-256 криптиране. Без облак. Без проследяване.',
    'cs': 'Sledujte svůj cyklus se soukromím. Šifrování AES-256. Žádný cloud. Žádné sledování.',
    'da': 'Spor din cyklus privat. AES-256 krypteret. Ingen cloud. Ingen sporing. Dine data forbliver på din telefon.',
    'de-DE': 'Verfolge deinen Zyklus privat. AES-256 verschlüsselt. Keine Cloud. Kein Tracking. Immer offline.',
    'el': 'Παρακολουθήστε τον κύκλο σας με απόρρητο. AES-256 κρυπτογράφηση. Χωρίς cloud. Χωρίς παρακολούθηση.',
    'en-US': 'Your cycle data. Your phone. Encrypted. No server. No account. Ever.',
    'es-MX': 'Rastrea tu ciclo con privacidad. Cifrado AES-256. Sin nube. Sin rastreo. Tus datos en tu teléfono.',
    'es-ES': 'Rastrea tu ciclo con privacidad. Cifrado AES-256. Sin nube. Sin rastreo. Tus datos en tu móvil.',
    'fi': 'Seuraa sykliäsi yksityisesti. AES-256 salattu. Ei pilveä. Ei seurantaa. Tietosi pysyvät puhelimessasi.',
    'fr-CA': 'Vos données de cycle. Votre téléphone. Chiffré. Sans serveur. Sans compte. Jamais.',
    'fr-FR': 'Vos données de cycle. Votre téléphone. Chiffré. Sans serveur. Sans compte. Jamais.',
    'he': 'עקבי אחר המחזור שלך בפרטיות. הצפנת AES-256. ללא ענן. ללא מעקב. הנתונים שלך נשארים בטלפון.',
    'hi': 'अपने चक्र को गोपनीयता से ट्रैक करें। AES-256 एन्क्रिप्टेड। कोई क्लाउड नहीं। डेटा सुरक्षित।',
    'hr': 'Pratite ciklus s privatnošću. AES-256 šifriranje. Bez oblaka. Bez praćenja. Podaci ostaju na telefonu.',
    'hu': 'Kövesse ciklusát privátban. AES-256 titkosítás. Nincs felhő. Nincs nyomkövetés.',
    'id': 'Lacak siklus Anda dengan privasi. Enkripsi AES-256. Tanpa cloud. Tanpa pelacakan. Data di ponsel Anda.',
    'it': 'I tuoi dati ciclo. Il tuo telefono. Crittografato. Nessun server. Nessun account. Mai.',
    'ja': 'あなたのサイクルデータ。あなたのスマホ。暗号化済み。サーバーなし。アカウント不要。',
    'ko': '내 주기 데이터. 내 폰. 암호화. 서버 없음. 계정 없음. 영원히.',
    'ms': 'Jejaki kitaran anda dengan privasi. Enkripsi AES-256. Tiada awan. Tiada penjejakan. Data di telefon anda.',
    'nl-NL': 'Uw cyclusgegevens. Uw telefoon. Versleuteld. Geen server. Geen account. Ooit.',
    'no': 'Din syklusdata. Din telefon. Kryptert. Ingen server. Ingen konto. Noensinne.',
    'pl': 'Twoje dane cyklu. Twój telefon. Zaszyfrowane. Bez serwera. Bez konta. Nigdy.',
    'pt-BR': 'Seus dados de ciclo. Seu telefone. Criptografado. Sem servidor. Sem conta. Nunca.',
    'pt-PT': 'Os seus dados de ciclo. O seu telefone. Encriptado. Sem servidor. Sem conta. Nunca.',
    'ro': 'Datele ciclului tău. Telefonul tău. Criptat. Fără server. Fără cont. Niciodată.',
    'ru': 'Ваши данные цикла. Ваш телефон. Зашифровано. Без сервера. Без аккаунта. Никогда.',
    'sk': 'Vaše dáta cyklu. Váš telefón. Šifrované. Bez servera. Bez účtu. Nikdy.',
    'sv': 'Din cykeldata. Din telefon. Krypterat. Ingen server. Inget konto. Någonsin.',
    'th': 'ข้อมูลรอบเดือนของคุณ โทรศัพท์ของคุณ เข้ารหัส ไม่มีเซิร์ฟเวอร์ ไม่มีบัญชี ตลอดไป',
    'tr': 'Döngü verileriniz. Telefonunuz. Şifreli. Sunucu yok. Hesap yok. Hiçbir zaman.',
    'uk': 'Ваші дані циклу. Ваш телефон. Зашифровано. Без сервера. Без акаунту. Ніколи.',
    'vi': 'Dữ liệu chu kỳ của bạn. Điện thoại của bạn. Đã mã hóa. Không có máy chủ. Không có tài khoản.',
    'zh-Hans':'您的经期数据。您的手机。加密。无服务器。无需账户。永远如此。',
    'zh-Hant':'您的經期數據。您的手機。加密。無伺服器。無需帳戶。永遠如此。',
}

# Release notes per iOS metadata locale (v0.1.0 - initial launch)
RELEASE_NOTES = {
    'am': '• የተከፋፈለ ዑደት ቀለበት ከደረጃ ቀለም ኮድ ጋር\n• ጠንካራ የግላዊነት ዋስትናዎች በስርዓተ ክወና ደረጃ ተፈጻሚ ይሆናሉ\n• AES-256-GCM የተመሰጠረ የአካባቢ ማከማቻ\n• የተሻሻለ ተደራሽነት (VoiceOver፣ Dynamic Type)',
    'ar-SA': '• حلقة دورة مجزأة ذات ترميز لوني\n• ضمانات الخصوصية المحسّنة\n• تخزين محلي مشفر AES-256-GCM',
    'bg': '• Сегментиран цикличен пръстен с фазово цветно кодиране\n• По-силни гаранции за поверителност, наложени на ниво ОС\n• AES-256-GCM криптирано локално хранилище\n• Подобрена достъпност (VoiceOver, Dynamic Type)',
    'bn': '• ফেজ কালার কোডিং সহ সেগমেন্টেড সাইকেল রিং\n• শক্তিশালী গোপনীয়তা গ্যারান্টি OS স্তরে প্রয়োগ করা হয়েছে\n• AES-256-GCM এনক্রিপ্ট করা স্থানীয় স্টোরেজ\n• উন্নত অ্যাক্সেসযোগ্যতা (ভয়েসওভার, ডায়নামিক টাইপ)',
    'ca': '• Anell de cicle segmentat amb codificació de color de fase\n• Garanties de privadesa més sòlides a nivell del sistema operatiu\n• Emmagatzematge local xifrat AES-256-GCM\n• Accessibilitat millorada (VoiceOver, tipus dinàmic)',
    'cs': '• Segmentovaný cyklový prsten s barevným kódováním\n• Vylepšené záruky soukromí\n• Místní šifrované úložiště AES-256-GCM',
    'da': '• Segmenteret cyklus-ring med farvekodning\n• Forbedrede privatlivsgarantier\n• Lokalt krypteret lager AES-256-GCM',
    'de-DE': '• Segmentierter Zyklusring mit Phasenfarben\n• Verstärkter Datenschutz auf OS-Ebene\n• AES-256-GCM Verschlüsselung\n• Verbesserte Barrierefreiheit',
    'el': '• Τμηματοποιημένος δακτύλιος κύκλου με χρωματική κωδικοποίηση\n• Βελτιωμένες εγγυήσεις απορρήτου\n• Τοπικά κρυπτογραφημένη αποθήκευση AES-256-GCM',
    'en-US': '• Segmented cycle ring with phase color-coding\n• Current iPhone release ships in English and French\n• Enhanced OS-level privacy guarantees\n• AES-256-GCM local encrypted storage\n• Improved accessibility',
    'es-ES': '• Anillo de ciclo segmentado con código de color por fase\n• Garantías de privacidad reforzadas\n• Cifrado AES-256-GCM\n• Accesibilidad mejorada',
    'es-MX': '• Anillo de ciclo segmentado con código de color\n• Garantías de privacidad mejoradas\n• Almacenamiento cifrado AES-256-GCM',
    'fa': '• حلقه چرخه قطعه بندی شده با کدگذاری رنگ فاز\n• ضمانت\u200cهای حفظ حریم خصوصی قوی\u200cتر در سطح سیستم\u200cعامل اجرا می\u200cشوند\n• ذخیره سازی محلی رمزگذاری شده AES-256-GCM\n• دسترسی بهبودیافته (VoiceOver، Dynamic Type)',
    'fi': '• Segmentoitu syklirengas värikoodauksella\n• Parannetut tietosuojatakuut\n• Paikallinen salattu tallennus AES-256-GCM',
    'fr-CA': '• Anneau de cycle segmenté avec code couleur\n• Garanties de confidentialité renforcées\n• Stockage local chiffré AES-256-GCM',
    'fr-FR': '• Anneau de cycle segmenté avec code couleur par phase\n• Version iPhone actuellement disponible en anglais et en français\n• Garanties de confidentialité renforcées au niveau OS\n• Stockage local chiffré AES-256-GCM\n• Accessibilité améliorée',
    'he': '• טבעת מחזור מפולחת עם קידוד צבעים\n• ערבויות פרטיות משופרות\n• אחסון מקומי מוצפן AES-256-GCM',
    'hi': '• रंग-कोडित फेज के साथ सेगमेंटेड साइकिल रिंग\n• बेहतर गोपनीयता गारंटी\n• AES-256-GCM स्थानीय एन्क्रिप्टेड स्टोरेज',
    'hr': '• Segmentirani prsten ciklusa s kodiranjem boja\n• Poboljšana jamstva privatnosti\n• Lokalna šifrirana pohrana AES-256-GCM',
    'hu': '• Szegmentált ciklusgyűrű színkódolással\n• Javított adatvédelmi garanciák\n• Helyi titkosított tárolás AES-256-GCM',
    'id': '• Cincin siklus tersegmentasi dengan kode warna\n• Jaminan privasi yang ditingkatkan\n• Penyimpanan terenkripsi lokal AES-256-GCM',
    'it': '• Anello ciclo segmentato con codice colore\n• Garanzie di privacy migliorate\n• Archiviazione crittografata AES-256-GCM',
    'it-IT': '• Anello ciclo segmentato con codice colore\n• Garanzie di privacy migliorate\n• Archiviazione crittografata AES-256-GCM',
    'ja': '• 28セグメント周期リング（フェーズ別カラーコード）\n• OS レベルのプライバシー保護強化\n• AES-256-GCM 暗号化\n• アクセシビリティ改善',
    'ko': '• 페이즈 색상 코딩이 있는 분할 주기 링\n• 향상된 개인정보 보호 보장\n• AES-256-GCM 로컬 암호화 스토리지',
    'ms': '• Gelang kitaran tersegmen dengan pengekodan warna\n• Jaminan privasi yang dipertingkatkan\n• Storan tempatan yang disulitkan AES-256-GCM',
    'nb': '• Segmentert syklusring med fasefargekoding\n• Sterkere personverngarantier håndhevet på OS-nivå\n• AES-256-GCM kryptert lokal lagring\n• Forbedret tilgjengelighet (VoiceOver, Dynamic Type)',
    'nl-NL': '• Gesegmenteerde cyclusring met kleurcodering\n• Verbeterde privacygaranties\n• Lokale versleutelde opslag AES-256-GCM',
    'no': '• Segmentert syklusring med fargekodig\n• Forbedrede personverngarantier\n• Lokalt kryptert lagring AES-256-GCM',
    'pl': '• Segmentowany pierścień cyklu z kodowaniem kolorów\n• Ulepszone gwarancje prywatności\n• Lokalna zaszyfrowana pamięć AES-256-GCM',
    'pt-BR': '• Anel de ciclo segmentado com codificação de cores\n• Garantias de privacidade aprimoradas\n• Armazenamento criptografado AES-256-GCM',
    'pt-PT': '• Anel de ciclo segmentado com código de cores\n• Garantias de privacidade melhoradas\n• Armazenamento encriptado AES-256-GCM',
    'ro': '• Inel de ciclu segmentat cu codificare prin culori\n• Garanții îmbunătățite de confidențialitate\n• Stocare locală criptată AES-256-GCM',
    'ru': '• Сегментированное кольцо цикла с цветовым кодированием\n• Улучшенные гарантии конфиденциальности\n• Локальное зашифрованное хранилище AES-256-GCM',
    'sk': '• Segmentovaný cyklový prsteň s farebným kódovaním\n• Vylepšené záruky súkromia\n• Miestne šifrované úložisko AES-256-GCM',
    'sv': '• Segmenterad cykelring med färgkodning\n• Förbättrade integritetskaarntier\n• Lokalt krypterat lagringsutrymme AES-256-GCM',
    'th': '• วงแหวนรอบเดือนแบบแบ่งส่วนพร้อมการเข้ารหัสสี\n• การรับประกันความเป็นส่วนตัวที่เพิ่มขึ้น\n• พื้นที่จัดเก็บแบบเข้ารหัสในเครื่อง AES-256-GCM',
    'tr': '• Renk kodlamalı segmentli döngü halkası\n• Geliştirilmiş gizlilik garantileri\n• Yerel şifreli depolama AES-256-GCM',
    'uk': '• Сегментоване кільце циклу з колірним кодуванням\n• Покращені гарантії конфіденційності\n• Локальне зашифроване сховище AES-256-GCM',
    'vi': '• Vòng tròn chu kỳ phân đoạn có mã màu\n• Đảm bảo quyền riêng tư nâng cao\n• Lưu trữ cục bộ được mã hóa AES-256-GCM',
    'zh-Hans': '• 分段式周期环，带相位颜色编码\n• 增强的操作系统级隐私保证\n• AES-256-GCM本地加密存储',
    'zh-Hant': '• 分段式週期環，帶相位顏色編碼\n• 增強的作業系統級隱私保證\n• AES-256-GCM本地加密儲存',
}


def read_android(locale_folder, filename):
    path = os.path.join(AND_META, locale_folder, filename)
    if os.path.exists(path):
        return open(path).read().strip()
    return ''


def write_ios(ios_locale, filename, content):
    folder = os.path.join(IOS_META, ios_locale)
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, filename)
    with open(path, 'w') as f:
        f.write(content)


def copy_screenshots(ios_locale):
    """Copy en-US screenshots to locale folder if missing."""
    dst = os.path.join(IOS_SS, ios_locale)
    if os.path.exists(dst) and any(os.scandir(dst)):
        return # already has screenshots
    if not os.path.exists(EN_SS):
        return
    os.makedirs(dst, exist_ok=True)
    for device_dir in os.listdir(EN_SS):
        src_dev = os.path.join(EN_SS, device_dir)
        dst_dev = os.path.join(dst, device_dir)
        if os.path.isdir(src_dev) and not os.path.exists(dst_dev):
            shutil.copytree(src_dev, dst_dev)
            print(f' Copied screenshots → {ios_locale}/{device_dir}')


def truncate(s, max_len):
    if len(s) <= max_len:
        return s
    return s[:max_len-1].rstrip()


def main():
    print('Generating iOS metadata for shipped locales (en-US, fr-FR)...\n')

    for source_locale, ios_locale in IOS_METADATA_SOURCES.items():
        print(f'[{source_locale} → {ios_locale}]')

        # Read Android content
        android_title = read_android(source_locale, 'title.txt')
        android_desc = read_android(source_locale, 'full_description.txt')
        android_short = read_android(source_locale, 'short_description.txt')

        # Check existing iOS content
        ios_folder = os.path.join(IOS_META, ios_locale)
        existing_name = ''
        existing_desc = ''
        existing_kw = ''
        existing_sub = ''
        existing_promo = ''
        existing_notes = ''
        if os.path.isdir(ios_folder):
            existing_name = open(os.path.join(ios_folder, 'name.txt')).read().strip() if os.path.exists(os.path.join(ios_folder, 'name.txt')) else ''
            existing_desc = open(os.path.join(ios_folder, 'description.txt')).read().strip() if os.path.exists(os.path.join(ios_folder, 'description.txt')) else ''
            existing_kw = open(os.path.join(ios_folder, 'keywords.txt')).read().strip() if os.path.exists(os.path.join(ios_folder, 'keywords.txt')) else ''
            existing_sub = open(os.path.join(ios_folder, 'subtitle.txt')).read().strip() if os.path.exists(os.path.join(ios_folder, 'subtitle.txt')) else ''
            existing_promo = open(os.path.join(ios_folder, 'promotional_text.txt')).read().strip() if os.path.exists(os.path.join(ios_folder, 'promotional_text.txt')) else ''
            existing_notes = open(os.path.join(ios_folder, 'release_notes.txt')).read().strip() if os.path.exists(os.path.join(ios_folder, 'release_notes.txt')) else ''

        # name.txt (max 30 chars) — keep existing if good, else from Android title
        name = existing_name or android_title
        name = truncate(name, 30)
        write_ios(ios_locale, 'name.txt', name)
        print(f' name: {name}')

        # subtitle.txt (max 30 chars)
        subtitle = existing_sub or SUBTITLES.get(ios_locale, 'Private. Encrypted. No server.')
        subtitle = truncate(subtitle, 30)
        write_ios(ios_locale, 'subtitle.txt', subtitle)

        # description.txt (max 4000 chars)
        desc = existing_desc or android_desc
        desc = truncate(desc, 4000)
        if desc:
            write_ios(ios_locale, 'description.txt', desc)

        # keywords.txt (max 100 chars)
        kw = existing_kw or KEYWORDS.get(ios_locale, KEYWORDS['en-US'])
        kw = truncate(kw, 100)
        write_ios(ios_locale, 'keywords.txt', kw)

        # promotional_text.txt (max 170 chars)
        promo = existing_promo or PROMO_TEXT.get(ios_locale, android_short) or PROMO_TEXT.get('en-US', '')
        promo = truncate(promo, 170)
        write_ios(ios_locale, 'promotional_text.txt', promo)

        # release_notes.txt (max 4000 chars)
        notes = RELEASE_NOTES.get(ios_locale, existing_notes or RELEASE_NOTES['en-US'])
        write_ios(ios_locale, 'release_notes.txt', notes)

        # Screenshots: copy from en-US if missing
        copy_screenshots(ios_locale)

    print('\nDone! iOS metadata generated for shipped locales.')
    print(f'Locales: {sorted(IOS_METADATA_SOURCES.values())}')
    print('\nRun: fastlane ios upload_metadata')


if __name__ == '__main__':
    main()
