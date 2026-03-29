/// Evidence module for Luna — all medical/scientific claims must be cited.
/// DO NOT add uncited claims. Mark unverified claims with // TODO: VERIFY.
pub struct Citation {
    pub id: &'static str,
    pub title: &'static str,
    pub authors: &'static str,
    pub journal: &'static str,
    pub year: u16,
    pub doi: &'static str,
}

pub const CITATIONS: &[Citation] = &[
    Citation {
        id: "bull_2019",
        title: "Real-world menstrual cycle characteristics of more than 1.5 million cycles in the Clue app",
        authors: "Bull JR, Rowland SP, Scherwitz NW, Bjelajac V, Huebner M, Wise LA",
        journal: "npj Digital Medicine",
        year: 2019,
        doi: "10.1038/s41746-019-0152-7",
    },
    Citation {
        id: "wilcox_2000",
        title: "The timing of the 'fertile window' in the menstrual cycle: day specific estimates from a prospective study",
        authors: "Wilcox AJ, Dunson D, Baird DD",
        journal: "New England Journal of Medicine",
        year: 2000,
        doi: "10.1056/NEJM200006223422502",
    },
    Citation {
        id: "lenton_1984",
        title: "Normal variation in the length of the luteal phase of the menstrual cycle: association with progesterone levels",
        authors: "Lenton EA, Landgren BM, Sexton L, Harper R",
        journal: "British Journal of Obstetrics and Gynaecology",
        year: 1984,
        doi: "10.1111/j.1471-0528.1984.tb04802.x",
    },
    Citation {
        id: "barron_2005",
        title: "Basal body temperature assessment: is it useful to couples seeking pregnancy?",
        authors: "Barron ML, Fehring RJ, Fox SD",
        journal: "MCN American Journal of Maternal Child Nursing",
        year: 2005,
        doi: "10.1097/00005721-200507000-00011",
    },
    Citation {
        id: "bigelow_2004",
        title: "Mucus observations in the fertile window: a strong predictor of conception",
        authors: "Bigelow JL, Dunson DB, Stanford JB, Ecochard R, Gnoth C, Colombo B",
        journal: "Human Reproduction",
        year: 2004,
        doi: "10.1093/humrep/deh173",
    },
    Citation {
        id: "cox_1987",
        title: "Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale",
        authors: "Cox JL, Holden JM, Sagovsky R",
        journal: "British Journal of Psychiatry",
        year: 1987,
        doi: "10.1192/bjp.150.6.782",
    },
];

pub const MEDICAL_DISCLAIMER: &str =
    "This app provides cycle tracking information for educational purposes only. \
     It is not a substitute for medical advice, diagnosis, or contraception. \
     Cycle predictions are estimates and accuracy varies significantly by individual. \
     Do not rely on this app to prevent pregnancy or diagnose health conditions.";

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_citations_all_have_dois() {
        for citation in CITATIONS {
            assert!(
                citation.doi.starts_with("10."),
                "Citation {} missing valid DOI: {}",
                citation.id,
                citation.doi
            );
        }
    }

    #[test]
    fn test_disclaimer_not_empty() {
        assert!(!MEDICAL_DISCLAIMER.is_empty());
        assert!(MEDICAL_DISCLAIMER.len() > 50);
    }
}
