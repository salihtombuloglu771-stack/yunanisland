alter table public.islands add column if not exists description_el text;
alter table public.islands add column if not exists history_el text;
alter table public.islands add column if not exists best_time_to_visit_el text;

-- English translations for the 3 islands that were missing them
update public.islands set
  description_en = 'The largest and most historic island of the Dodecanese, with its medieval Old Town encircled by the Knights'' fortifications, the ancient Acropolis of Lindos, and long sandy beaches.',
  history_en = 'The gigantic Colossus of Rhodes, one of the Seven Wonders of the Ancient World, once stood here. The walled Old Town, built by the Knights of St. John in the Middle Ages, is a UNESCO World Heritage Site.',
  best_time_to_visit_en = 'May - October'
where slug = 'rodos';

update public.islands set
  description_en = 'A calm yet lively Cycladic island, famous for the fishing-village atmosphere of Naousa, the windsurfing scene at Golden Beach, and its white marble quarries.',
  history_en = 'In antiquity, Parian marble was world-famous among sculptors; many celebrated statues, including the Venus de Milo in the Louvre, were carved from it.',
  best_time_to_visit_en = 'June - September'
where slug = 'paros';

update public.islands set
  description_en = 'With its moon-like white volcanic rock formations, hidden coves reachable only by boat, and colorful fishing villages, this is one of the most photogenic islands in the Cyclades.',
  history_en = 'The famous Venus de Milo statue was discovered on this island by a farmer in 1820. The island has also been known for obsidian (volcanic glass) mining since antiquity.',
  best_time_to_visit_en = 'June - September'
where slug = 'milos';

-- Greek translations for all 8 islands
update public.islands set
  description_el = 'Διάσημη για τα μοναδικά ηλιοβασιλέματά της, τις γαλαζοθόλες εκκλησίες και τη θέα στην ηφαιστειακή καλδέρα, η Σαντορίνη είναι το πιο ρομαντικό και δημοφιλές νησί του Αιγαίου.',
  history_el = 'Γνωστή στην αρχαιότητα ως Θήρα, η Σαντορίνη πήρε τη σημερινή ημισεληνοειδή μορφή της μετά από μία από τις μεγαλύτερες ηφαιστειακές εκρήξεις στην ιστορία, γύρω στο 1600 π.Χ. Ορισμένοι θεωρητικοί ισχυρίζονται ότι εδώ βρισκόταν η χαμένη ήπειρος της Ατλαντίδας.',
  best_time_to_visit_el = 'Σεπτέμβριος - Οκτώβριος'
where slug = 'santorini';

update public.islands set
  description_el = 'Γνωστό για την κοσμοπολίτικη νυχτερινή ζωή του, τους ιστορικούς ανεμόμυλους, τα δαιδαλώδη σοκάκια και τις τιρκουάζ παραλίες, είναι το κορυφαίο party νησί του Αιγαίου.',
  history_el = 'Σύμφωνα με την ελληνική μυθολογία, η Μύκονος σχηματίστηκε από τα απολιθωμένα σώματα γιγάντων που σκότωσε ο Ηρακλής. Πήρε το όνομά της από τον εγγονό του Απόλλωνα, Μύκονο, και έγινε πόλος έλξης για καλλιτέχνες και διασημότητες από τη δεκαετία του 1950 και μετά.',
  best_time_to_visit_el = 'Ιούλιος - Αύγουστος'
where slug = 'mykonos';

update public.islands set
  description_el = 'Ένας παράδεισος στο Ιόνιο Πέλαγος, φημισμένος για την εμβληματική παραλία Ναυάγιο, τους επιβλητικούς ασβεστολιθικούς βράχους και τις θαλάσσιες χελώνες καρέτα-καρέτα.',
  history_el = 'Η Ζάκυνθος (ή Ζάντε) βρισκόταν για αιώνες υπό ενετική κυριαρχία και ήταν γνωστή ως «Fior di Levante» (Άνθος της Ανατολής). Η ιταλική αρχιτεκτονική και οι μουσικές παραδόσεις έχουν αφήσει βαθιά σημάδια στον πολιτισμό του νησιού.',
  best_time_to_visit_el = 'Ιούνιος - Σεπτέμβριος'
where slug = 'zakynthos';

update public.islands set
  description_el = 'Το μεγαλύτερο νησί των Κυκλάδων, γνωστό για τις πλατιές παραλίες του, την αρχαία Πορτάρα του Ναού του Απόλλωνα και τα νόστιμα τοπικά προϊόντα — ιδανικό για οικογένειες.',
  history_el = 'Σύμφωνα με τη μυθολογία, στη Νάξο μεγάλωσε ο Δίας, και εκεί ο Θησέας εγκατέλειψε την Αριάδνη μετά τη θανάτωση του Μινώταυρου. Τον Μεσαίωνα έγινε έδρα του Δουκάτου του Αιγαίου των Ενετών.',
  best_time_to_visit_el = 'Ιούνιος - Σεπτέμβριος'
where slug = 'naxos';

update public.islands set
  description_el = 'Γενέτειρα του Ιπποκράτη, του πατέρα της ιατρικής, η Κως είναι ένα δημοφιλές νησί των Δωδεκανήσων γνωστό για τα πλούσια ιστορικά ερείπια, τα εκτεταμένα ποδηλατόδρομα και τις μακριές αμμουδερές παραλίες του.',
  history_el = 'Το Ασκληπιείο — η πρώτη ιατρική σχολή και θεραπευτήριο στον κόσμο — ιδρύθηκε εδώ στην αρχαιότητα. Το ιστορικό Δέντρο του Ιπποκράτη, όπου πιστεύεται ότι δίδασκε τους μαθητές του στη σκιά του, στέκεται ακόμη στο κέντρο του νησιού. Το νησί βρέθηκε για μεγάλο διάστημα υπό οθωμανική και ιταλική κυριαρχία.',
  best_time_to_visit_el = 'Ιούνιος - Σεπτέμβριος'
where slug = 'kos';

update public.islands set
  description_el = 'Το μεγαλύτερο και πιο ιστορικό νησί των Δωδεκανήσων, με τη μεσαιωνική Παλιά Πόλη περιτριγυρισμένη από τα τείχη των Ιπποτών, την αρχαία Ακρόπολη της Λίνδου και τις μακριές αμμουδερές παραλίες.',
  history_el = 'Εδώ βρισκόταν κάποτε ο γιγαντιαίος Κολοσσός της Ρόδου, ένα από τα Επτά Θαύματα του Αρχαίου Κόσμου. Η τειχισμένη Παλιά Πόλη, χτισμένη από τους Ιππότες του Αγίου Ιωάννη τον Μεσαίωνα, είναι Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO.',
  best_time_to_visit_el = 'Μάιος - Οκτώβριος'
where slug = 'rodos';

update public.islands set
  description_el = 'Ένα ήρεμο αλλά ζωντανό νησί των Κυκλάδων, γνωστό για την ατμόσφαιρα ψαροχωριού της Νάουσας, τη σκηνή windsurfing στη Χρυσή Άμμο και τα λευκά μαρμαρορυχεία του.',
  history_el = 'Στην αρχαιότητα, το παριανό μάρμαρο ήταν παγκοσμίως φημισμένο μεταξύ των γλυπτών· πολλά διάσημα αγάλματα, όπως η Αφροδίτη της Μήλου στο Λούβρο, σκαλίστηκαν από αυτό.',
  best_time_to_visit_el = 'Ιούνιος - Σεπτέμβριος'
where slug = 'paros';

update public.islands set
  description_el = 'Με τους σεληνιακούς λευκούς ηφαιστειογενείς σχηματισμούς βράχων, τους κρυμμένους όρμους που προσεγγίζονται μόνο με σκάφος και τα πολύχρωμα ψαροχώρια της, είναι ένα από τα πιο φωτογενή νησιά των Κυκλάδων.',
  history_el = 'Το διάσημο άγαλμα της Αφροδίτης της Μήλου ανακαλύφθηκε σε αυτό το νησί από έναν αγρότη το 1820. Το νησί είναι επίσης γνωστό για την εξόρυξη οψιδιανού (ηφαιστειακού γυαλιού) από την αρχαιότητα.',
  best_time_to_visit_el = 'Ιούνιος - Σεπτέμβριος'
where slug = 'milos';
