alter table public.islands add column if not exists faqs_en jsonb default '[]'::jsonb;
alter table public.islands add column if not exists faqs_el jsonb default '[]'::jsonb;

-- Girit (Crete)
update public.islands set
  faqs_en = '[
    {"question": "How do you get to Crete?", "answer": "Crete has international airports in Heraklion and Chania, and it can also be reached by overnight ferry from the port of Piraeus in Athens."},
    {"question": "How big is Crete, and how many days do you need to see it?", "answer": "Greece''s largest island — roughly 260 km long — is best explored over at least 5 to 7 days."},
    {"question": "Do you need a guide to visit the Palace of Knossos?", "answer": "It is not required, but given the palace''s complex layout and rich history, a guided tour makes the visit far more meaningful."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Πώς φτάνει κανείς στην Κρήτη;", "answer": "Η Κρήτη διαθέτει διεθνή αεροδρόμια στο Ηράκλειο και τα Χανιά, ενώ μπορεί κανείς να φτάσει και με νυχτερινό φέρι από το λιμάνι του Πειραιά στην Αθήνα."},
    {"question": "Πόσο μεγάλη είναι η Κρήτη και σε πόσες μέρες τη βλέπει κανείς;", "answer": "Το μεγαλύτερο νησί της Ελλάδας, με μήκος περίπου 260 χλμ., απαιτεί τουλάχιστον 5 έως 7 ημέρες για μια άνετη περιήγηση."},
    {"question": "Χρειάζεται ξεναγός για την επίσκεψη στο Ανάκτορο της Κνωσού;", "answer": "Δεν είναι απαραίτητο, όμως λόγω της περίπλοκης δομής και της ιστορίας του ανακτόρου, μια ξενάγηση κάνει την επίσκεψη πολύ πιο ουσιαστική."}
  ]'::jsonb
where slug = 'girit';

-- Kefalonya (Kefalonia)
update public.islands set
  faqs_en = '[
    {"question": "How do you get to Kefalonia?", "answer": "Kefalonia has its own airport near Argostoli, and it can also be reached by ferry from the ports of Patras and Killini."},
    {"question": "Is it difficult to reach Myrtos Beach?", "answer": "The road down has steep hairpin turns and the ground is covered in pebbles, but the viewpoint along the way offers a breathtaking panorama on its own."},
    {"question": "Is Kefalonia suitable for families?", "answer": "Yes, with its peaceful villages, natural caves and spacious beaches, it makes for a very family-friendly holiday."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Πώς φτάνει κανείς στην Κεφαλονιά;", "answer": "Η Κεφαλονιά διαθέτει δικό της αεροδρόμιο κοντά στο Αργοστόλι, ενώ εξυπηρετείται και με φέρι από τα λιμάνια της Πάτρας και της Κυλλήνης."},
    {"question": "Είναι δύσκολη η κατάβαση στην παραλία Μύρτος;", "answer": "Ο δρόμος προς την παραλία έχει απότομες στροφές και το έδαφος είναι χαλικώδες, όμως το σημείο θέας στη διαδρομή προσφέρει από μόνο του μια εντυπωσιακή θέα."},
    {"question": "Είναι η Κεφαλονιά κατάλληλη για οικογένειες;", "answer": "Ναι, με τα ήσυχα χωριά, τα φυσικά σπήλαια και τις ευρύχωρες παραλίες της, προσφέρει μια ιδανική οικογενειακή εμπειρία."}
  ]'::jsonb
where slug = 'kefalonya';

-- Korfu (Corfu)
update public.islands set
  faqs_en = '[
    {"question": "How do you reach Corfu from other parts of Greece?", "answer": "Corfu has its own international airport, and ferries also run regularly from the ports of Patras and Igoumenitsa."},
    {"question": "Why does Corfu look architecturally different from other Greek islands?", "answer": "Because it was never under Ottoman rule, Corfu carries strong traces of Venetian, French and British architecture."},
    {"question": "Is Corfu a good choice for a honeymoon?", "answer": "Yes, its tranquil coves, luxury boutique hotels and romantic sunset spots make it a popular honeymoon destination."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Πώς φτάνει κανείς στην Κέρκυρα από άλλα μέρη της Ελλάδας;", "answer": "Η Κέρκυρα διαθέτει δικό της διεθνές αεροδρόμιο, ενώ υπάρχουν τακτικά δρομολόγια φέρι από τα λιμάνια της Πάτρας και της Ηγουμενίτσας."},
    {"question": "Γιατί η Κέρκυρα διαφέρει αρχιτεκτονικά από τα άλλα ελληνικά νησιά;", "answer": "Καθώς δεν βρέθηκε ποτέ υπό οθωμανική κυριαρχία, η Κέρκυρα φέρει έντονα ίχνη ενετικής, γαλλικής και βρετανικής αρχιτεκτονικής."},
    {"question": "Είναι η Κέρκυρα κατάλληλη για μήνα του μέλιτος;", "answer": "Ναι, με τους ήρεμους όρμους, τα πολυτελή boutique ξενοδοχεία και τα ρομαντικά σημεία για το ηλιοβασίλεμα, είναι δημοφιλής προορισμός για ζευγάρια σε μήνα του μέλιτος."}
  ]'::jsonb
where slug = 'korfu';

-- Kos
update public.islands set
  faqs_en = '[
    {"question": "How long does the ferry from Bodrum to Kos take?", "answer": "Fast ferries take about 20 minutes, making Kos one of the Greek islands closest to Turkey."},
    {"question": "Is Kos a good choice for a family holiday?", "answer": "Yes, with its wide beaches, cycling paths and shallow waters, Kos is very well suited to families."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Πόσο διαρκεί το φέρι από το Bodrum προς την Κω;", "answer": "Τα ταχύπλοα φέρι διαρκούν περίπου 20 λεπτά, καθιστώντας την Κω ένα από τα πιο κοντινά ελληνικά νησιά στην Τουρκία."},
    {"question": "Είναι η Κως κατάλληλη για οικογενειακές διακοπές;", "answer": "Ναι, με τις πλατιές παραλίες, τα ποδηλατόδρομα και τα ρηχά νερά της, η Κως ταιριάζει ιδιαίτερα σε οικογένειες."}
  ]'::jsonb
where slug = 'kos';

-- Milos
update public.islands set
  faqs_en = '[
    {"question": "How do you get to Sarakiniko Beach?", "answer": "It is about a 10-minute drive from Adamas, Milos'' main port, and easily reached by car or taxi."},
    {"question": "Why is Milos an expensive island?", "answer": "As Milos has surged in worldwide popularity in recent years, accommodation capacity has stayed limited, driving prices up sharply, especially in July and August."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Πώς φτάνει κανείς στην παραλία Σαρακήνικο;", "answer": "Απέχει περίπου 10 λεπτά με αυτοκίνητο από τον Αδάμαντα, το κύριο λιμάνι της Μήλου, και είναι εύκολα προσβάσιμη με αυτοκίνητο ή ταξί."},
    {"question": "Γιατί η Μήλος είναι ένα ακριβό νησί;", "answer": "Καθώς η Μήλος έχει κερδίσει τεράστια δημοτικότητα παγκοσμίως τα τελευταία χρόνια, η περιορισμένη διαθεσιμότητα καταλυμάτων έχει οδηγήσει τις τιμές σε απότομη άνοδο, ιδίως τον Ιούλιο και τον Αύγουστο."}
  ]'::jsonb
where slug = 'milos';

-- Mykonos
update public.islands set
  faqs_en = '[
    {"question": "Is Mykonos known for its nightlife?", "answer": "Yes, Mykonos is one of Greece''s liveliest entertainment hubs, especially famous for its beach clubs and nightclubs."},
    {"question": "Is Mykonos suitable for families?", "answer": "Mykonos leans more toward a young and couples-oriented crowd, but calmer beaches like Elia offer family-friendly options."},
    {"question": "Is there a ferry from Bodrum to Mykonos?", "answer": "Direct ferries are limited; travelers usually connect through Kos or Athens."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Είναι η Μύκονος γνωστή για τη νυχτερινή ζωή της;", "answer": "Ναι, η Μύκονος είναι ένα από τα πιο ζωντανά κέντρα διασκέδασης της Ελλάδας, ξεχωρίζοντας ιδιαίτερα για τα beach club και τα νυχτερινά κέντρα της."},
    {"question": "Είναι η Μύκονος κατάλληλη για οικογένειες;", "answer": "Η Μύκονος απευθύνεται κυρίως σε νεαρό κοινό και ζευγάρια, ωστόσο πιο ήρεμες παραλίες όπως η Ελιά προσφέρουν επιλογές φιλικές προς οικογένειες."},
    {"question": "Υπάρχει φέρι από το Bodrum προς τη Μύκονο;", "answer": "Τα απευθείας δρομολόγια είναι περιορισμένα· συνήθως το ταξίδι γίνεται με ανταπόκριση μέσω Κω ή Αθήνας."}
  ]'::jsonb
where slug = 'mykonos';

-- Naxos
update public.islands set
  faqs_en = '[
    {"question": "Is Naxos a budget-friendly island?", "answer": "Yes, Naxos offers relatively affordable accommodation and dining options compared to other Cycladic islands."},
    {"question": "What activities does Naxos offer?", "answer": "Highlights include wide beaches, the ancient Portara gate, mountain villages, and local produce tasting tours."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Είναι η Νάξος ένα οικονομικό νησί;", "answer": "Ναι, η Νάξος προσφέρει σχετικά πιο προσιτές επιλογές διαμονής και εστίασης σε σύγκριση με άλλα νησιά των Κυκλάδων."},
    {"question": "Ποιες δραστηριότητες προσφέρει η Νάξος;", "answer": "Ξεχωρίζουν οι πλατιές παραλίες, η αρχαία Πορτάρα, τα ορεινά χωριά και οι γευσιγνωσίες τοπικών αγροτικών προϊόντων."}
  ]'::jsonb
where slug = 'naxos';

-- Paros
update public.islands set
  faqs_en = '[
    {"question": "Which islands is Paros close to?", "answer": "Paros sits at the heart of the Cyclades — just 45 minutes by ferry from Naxos, with easy connections to Mykonos and Santorini too — making it a favorite stop on island-hopping routes."},
    {"question": "What is there to do in Naousa?", "answer": "Naousa, the island''s liveliest village, is known for its colorful fishing harbor, pleasant evening strolls and seafood restaurants."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Με ποια νησιά γειτονεύει η Πάρος;", "answer": "Η Πάρος βρίσκεται στην καρδιά των Κυκλάδων — μόλις 45 λεπτά με φέρι από τη Νάξο, με εύκολες συνδέσεις και προς τη Μύκονο και τη Σαντορίνη — γι'' αυτό αποτελεί συχνή στάση στις διαδρομές island-hopping."},
    {"question": "Τι μπορεί να κάνει κανείς στη Νάουσα;", "answer": "Η Νάουσα, το πιο ζωντανό χωριό του νησιού, ξεχωρίζει για το πολύχρωμο ψαρολίμανό της, τους ευχάριστους βραδινούς περιπάτους και τα ψαροταβέρνες της."}
  ]'::jsonb
where slug = 'paros';

-- Rodos (Rhodes)
update public.islands set
  faqs_en = '[
    {"question": "How long does it take to explore the Old Town of Rhodes?", "answer": "A quick walk through the medieval-walled Old Town takes about half a day, while a thorough visit including the museums takes a full day."},
    {"question": "How do you get to Rhodes from Turkey?", "answer": "Regular ferries run from Marmaris, with a crossing time of about 1 to 1.5 hours during the summer months."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Πόσο χρόνο χρειάζεται η επίσκεψη στην Παλιά Πόλη της Ρόδου;", "answer": "Μια σύντομη βόλτα στην Παλιά Πόλη, περιτριγυρισμένη από μεσαιωνικά τείχη, διαρκεί περίπου μισή μέρα, ενώ μια πιο ενδελεχής επίσκεψη με τα μουσεία απαιτεί μια ολόκληρη ημέρα."},
    {"question": "Πώς φτάνει κανείς στη Ρόδο από την Τουρκία;", "answer": "Υπάρχουν τακτικά δρομολόγια φέρι από το Μαρμαρίς, με διάρκεια διαδρομής περίπου 1 έως 1,5 ώρα τους καλοκαιρινούς μήνες."}
  ]'::jsonb
where slug = 'rodos';

-- Santorini
update public.islands set
  faqs_en = '[
    {"question": "Do you need a visa to visit Santorini?", "answer": "As Greece is part of the Schengen Area, Turkish citizens need a Schengen visa for short-term visits."},
    {"question": "Where is the best place to watch the sunset in Santorini?", "answer": "The village of Oia is world-famous for its sunset views; it gets very crowded in summer, so arriving early to secure a spot is recommended."},
    {"question": "Is Santorini an expensive island?", "answer": "Yes, Santorini is one of the priciest Greek islands, and accommodation costs rise noticeably in July and August in particular."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Χρειάζεται βίζα για επίσκεψη στη Σαντορίνη;", "answer": "Καθώς η Ελλάδα ανήκει στον χώρο Σένγκεν, οι Τούρκοι πολίτες χρειάζονται βίζα Σένγκεν για σύντομες επισκέψεις."},
    {"question": "Από πού βλέπει κανείς καλύτερα το ηλιοβασίλεμα στη Σαντορίνη;", "answer": "Το χωριό Οία είναι παγκοσμίως φημισμένο για τη θέα του ηλιοβασιλέματος· το καλοκαίρι γίνεται πολύ πολυσύχναστο, γι'' αυτό συνιστάται να καταφτάνετε νωρίς για να εξασφαλίσετε θέση."},
    {"question": "Είναι η Σαντορίνη ακριβό νησί;", "answer": "Ναι, η Σαντορίνη είναι από τα πιο ακριβά ελληνικά νησιά· οι τιμές διαμονής αυξάνονται αισθητά, ιδίως τους μήνες Ιούλιο και Αύγουστο."}
  ]'::jsonb
where slug = 'santorini';

-- Zakynthos
update public.islands set
  faqs_en = '[
    {"question": "How do you get to Navagio Beach?", "answer": "There is no road to Navagio Beach — it can only be reached by boat tour."},
    {"question": "When is the best time to visit Zakynthos?", "answer": "June through September is the best period; July and August are busiest, but that is also when the sea is at its warmest."}
  ]'::jsonb,
  faqs_el = '[
    {"question": "Πώς φτάνει κανείς στην παραλία Ναυάγιο;", "answer": "Δεν υπάρχει οδική πρόσβαση στο Ναυάγιο — η προσέγγιση γίνεται αποκλειστικά με βαρκάδα."},
    {"question": "Πότε είναι η καλύτερη περίοδος για επίσκεψη στη Ζάκυνθο;", "answer": "Η περίοδος Ιούνιος-Σεπτέμβριος είναι η πιο κατάλληλη· ο Ιούλιος και ο Αύγουστος είναι οι πιο πολυσύχναστοι μήνες, αλλά και εκείνοι με τη ζεστότερη θάλασσα."}
  ]'::jsonb
where slug = 'zakynthos';
