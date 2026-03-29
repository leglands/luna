pub use life_crypto::{
    compress_blob, decompress_blob, decrypt, derive_key, encrypt, generate_salt,
    key_to_sqlcipher_pragma, secure_zero, CryptoError, ExposeSecret, SecretVec, KEY_LEN, NONCE_LEN,
    SALT_LEN,
};

use crate::error::LunaError;
use ring::hkdf;

pub fn derive_subkey(
    master_key: &SecretVec<u8>,
    context: &[u8],
) -> Result<SecretVec<u8>, LunaError> {
    let salt = hkdf::Salt::new(hkdf::HKDF_SHA256, b"luna-hkdf-salt-v1");
    let prk = salt.extract(master_key.expose_secret());
    let info = [context];
    let okm = prk
        .expand(&info, hkdf::HKDF_SHA256)
        .map_err(|_| LunaError::CryptoError("HKDF expand failed".into()))?;

    let mut subkey = vec![0u8; 32];
    okm.fill(&mut subkey)
        .map_err(|_| LunaError::CryptoError("HKDF fill failed".into()))?;

    Ok(SecretVec::new(subkey))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_subkey_derivation_is_deterministic() {
        let salt = generate_salt();
        let master = derive_key("123456", &salt).unwrap();

        let db_key1 = derive_subkey(&master, b"db_key").unwrap();
        let db_key2 = derive_subkey(&master, b"db_key").unwrap();
        assert_eq!(db_key1.expose_secret(), db_key2.expose_secret());

        let sync_key = derive_subkey(&master, b"sync_key").unwrap();
        assert_ne!(
            db_key1.expose_secret(),
            sync_key.expose_secret(),
            "Sous-clés identiques"
        );
    }
}
