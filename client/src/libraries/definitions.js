// Terms and definitions borrowed and adapted from https://sourcebooks.fordham.edu/byz/paleoggloss.asp#cont

const definitions = {
  Abbreviations: {
    short: 'Abbreviations were commonly used in Greek MSS for common words, frequently repeated words and some names.',
    long: 'Abbreviations were commonly used in Greek MSS for common words, frequently repeated words and some names. Abbreviation could be done by giving the first letter or first few letters of a word, or by omitting word endings. Other abbreviations were more complex, did not look at all like usual letters and derived from shorthand usages. When the word-shortening was done by omitting all the middle letters, it is a contraction.',
  },
  'Book Hands': {
    short: 'Types of writing used for literary texts meant to last.',
    long: 'Types of writing used for literary texts meant to last. The aim was clarity and regularity. In the antiquity, when a book trade existed this copying might be done to dictation. In the Byzantine period, copying seems to have been the work of individual scribes. The major division is between the uncial book hands used until the 9th century and the minuscule book hands used thereafter.',
  },
  Catena: {
    short: 'A Scholia-type commentary on patristic texts.',
  },
  Compendia: {
    short: 'Another term for abbreviations.',
  },
  Contraction: {
    short: 'A type of abbreviation where the word is shortened by ommitting all the middle letters.',
  },
  Cursive: {
    short: 'A writing style derived from the running action of the pen.',
    long: 'A writing style derived from the running action of the pen. It was used throughout antiquity, for private and public documents, and its letter forms were used as the basis of the more formal minuscule. A fundamental school taught alphabet of 24 letters remained behind all the letter forms.',
  },
  'Documentary Hands': {
    short: 'Types of writing used to write official documents. Often written rapidly without lifting the pen.',
  },
  Ekthesis: {
    short: 'A large, decorative letter at the beginning of a line.',
    long: 'A large, decorative letter at the beginning of a line. Potential to provide longer explanations of a concept here, followed by image examples.',
  },
  Foliation: {
    short: 'The numbering of folios within MSS.',
  },
  Glosses: {
    short: 'Synonyms of words added by scribes or commentators.',
  },
  Lemma: {
    short: 'The title of a work or chapter within a work.',
    long: 'The title of a work or chapter within a work. Commonly in later MSS it was written in Uncial letters, and often in red ink.',
  },
  Ligatures: {
    short: 'Two or three letters which are joined together, but where the form of each letter is preserved.',
    long: 'Two or three letters which are joined together, but where the form of each letter is preserved. They were uncommon in uncial MSS, but very common in minuscule MSS. Since they make reading harder, although writing faster, it is unfortunate that many were taken over an preserved in early Greek printer\'s fonts.',
  },
  'Literary Hands': {
    short: 'see book hands.',
  },
  Majuscule: {
    short: 'An alternative term for Uncial script.',
  },
  Miniscule: {
    short: 'A writing style characterized by rounded, connected letters and, often, ligatures.',
    long: 'The form of letters used in Greek changed from about 800 CE. The letter forms are quite distinct from the older uncial forms. Sometimes this change is traced to the Stoudion monastery, but in fact the letter-forms derive from previous cursive usage, although the scriptorium of the Stoudion monastery may have propagated the script. It was much faster to write than the older uncial script and the vast majority of Byzantine MSS are in minuscule. Minuscule MSS do not separate words, but do add breathings and accents, increasing legibility. The use of ligatures and abbreviations, however, counters ease of legibility. At first only the pure minuscule forms were used, but within a century, uncial letter forms began to be used alongside the pure minuscule (modern type fonts reflect both sources). To begin with, minuscule was written on the ruled lines of parchment, but later the fashion was to have the letters "hanging" from the line. Another later development was the use of a variety of different sizes for various letters. Although MSS dating is not perfect, distinct fashions in minuscule script do enable some dating of otherwise undated MSS.',
  },
  Monocondyle: {
    short: 'A word or sentence written without lifting pen from paper.',
  },
  Monogram: {
    short: 'A symbol in which a number of letters, usually of a name or title, are arranged together without any consideration for order.',
    long: 'A symbol in which a number of letters, usually of a name or title, are arranged together without any consideration for order. The common "Chi-Rho" symbol for Christ [a P (rho) imposed on a X (Chi)] is one example. In Byzantine MSS, they were used on monuments, coinss, ivories, etc. to indicate the owner.',
  },
  'Nomina Sacra': {
    short: 'Names of sacred persons reduced by contraction and marked by a line over the letters',
    long: 'Latin for "Sacred Names" A limited number of names of sacred persons were often reduced by contraction - for instance "IC" for Jesus, "KS" for "Kyrios". Often the name is marked by a line over the letters used.',
  },
  Pagination: {
    short: 'The numbering of pages. This was a fairly late development and is feature of printed books not MSS.',
  },
  Punctuation: {
    short: 'Typically a high dot marking a pause or end of sentence, may also be a comma (,), semi-colon (·), or period (.)',
    long: 'Greek punctuation is a relatively modern invention. It consists of the comma (,), the semi-colon (·), the period (.) and the interrogation mark (;). Many MSS lack punctuation; in others the main punctuation mark is a high dot, which may indicate a complete sentence or merely a pause.',
  },
  Scholia: {
    short: 'Commentaries and annotations on a text.',
    long: 'Commentaries and annotations on a text. Byzantine scholars loved to comment on older texts. A common way to do this was by making line-by-line marginal notes to a base manuscript. Such comments were often not original but compiled from earlier commentaries. They were common in Byzantium in 9th- and 10th-century MSS.',
  },
  Tachygraphy: {
    short: 'A form of shorthand used in antiquity and by some Byzantine scribes.',
    long: 'A form of shorthand used in antiquity and by some Byzantine scribes. A number of the signs were used as abbreviations in non-tachygraphical MSS.',
  },
  Uncial: {
    short: 'A writing style characterized by unconnected, capital letters of a consistent height.',
    long: 'The script deriving from the common letter forms of antiquity, used in most Greek books until the 9th century, when it was largely replaced by minuscule. It was used after that in headings (lemmata) within minuscule MSS and in liturgical MSS. The letters were unconnected, and all of the same hight. No word division was used. There are only few Uncial MSS which survive from the Byzantine period.',
  },
};

export default definitions;
