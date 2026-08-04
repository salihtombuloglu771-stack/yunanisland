-- Gezilecek yerlere İngilizce/Yunanca çeviri kolonları ekler ve 020/021 migration'larıyla
-- eklenen plaj/restoran satırlarında Türkçe içerikle bırakılıp çevirisi unutulan
-- description_en/description_el ve cuisine_en/cuisine_el alanlarını geriye dönük doldurur.

alter table public.attractions add column if not exists description_en text;
alter table public.attractions add column if not exists description_el text;

-- Santorini

update public.attractions set
  description_en = 'A Minoan-era settlement buried and preserved under volcanic ash in the 17th century BC, known as "the Pompeii of the Aegean." This remarkably well-preserved Bronze Age town features paved streets, three-story buildings and vivid frescoes.',
  description_el = 'Ένας οικισμός της μινωικής εποχής, θαμμένος και διατηρημένος κάτω από ηφαιστειακή τέφρα τον 17ο αιώνα π.Χ., γνωστός ως «η Πομπηία του Αιγαίου». Αυτή η αξιοσημείωτα καλά διατηρημένη πόλη της Εποχής του Χαλκού διαθέτει πλακόστρωτους δρόμους, τριώροφα κτίρια και ζωντανές τοιχογραφίες.'
where slug = 'akrotiri-arkeolojik-alani';

update public.attractions set
  description_en = 'Santorini''s most famous sunset view — with whitewashed houses, blue-domed churches and sweeping caldera panoramas, this is one of the most photographed spots on earth.',
  description_el = 'Η πιο διάσημη θέα ηλιοβασιλέματος της Σαντορίνης — με λευκά σπίτια, γαλαζοθόλες εκκλησίες και εντυπωσιακή θέα στην καλδέρα, είναι ένα από τα πιο φωτογραφημένα σημεία στον κόσμο.'
where slug = 'oia-kalesi-gun-batimi';

update public.attractions set
  description_en = 'Perched atop Mesa Vouno mountain, the ruins of an ancient city spanning the Dorian, Hellenistic and Roman periods — set against a breathtaking sea view.',
  description_el = 'Στην κορυφή του βουνού Μέσα Βουνό, τα ερείπια μιας αρχαίας πόλης που εκτείνεται στη δωρική, ελληνιστική και ρωμαϊκή περίοδο — με μια εκπληκτική θέα στη θάλασσα.'
where slug = 'eski-thira-antik-kenti';

update public.attractions set
  description_en = 'A Byzantine-era church in the village of Mesa Gonia dating back to 1052 — one of the island''s oldest and most important religious monuments.',
  description_el = 'Μια βυζαντινή εκκλησία στο χωριό Μέσα Γωνιά που χρονολογείται από το 1052 — ένα από τα παλαιότερα και σημαντικότερα θρησκευτικά μνημεία του νησιού.'
where slug = 'panagia-episkopi-kilisesi';

update public.attractions set
  description_en = 'A vineyard and museum above the village of Pyrgos with caldera views, showcasing wines made from Assyrtiko grapes grown in Santorini''s volcanic soil, complete with tastings.',
  description_el = 'Ένας αμπελώνας και μουσείο πάνω από το χωριό Πύργος με θέα στην καλδέρα, που παρουσιάζει κρασιά από το σταφύλι Ασύρτικο που καλλιεργείται στο ηφαιστειακό έδαφος της Σαντορίνης, με δυνατότητα οινογευσίας.'
where slug = 'santo-wines-sarap-muzesi';

-- Mykonos

update public.attractions set
  description_en = 'The whitewashed 16th-century windmills that have become the emblem of Mykonos Town — the island''s most photographed landmark.',
  description_el = 'Οι λευκοί ανεμόμυλοι του 16ου αιώνα που έχουν γίνει το έμβλημα της Χώρας της Μυκόνου — το πιο φωτογραφημένο αξιοθέατο του νησιού.'
where slug = 'kato-mili-yel-degirmenleri';

update public.attractions set
  description_en = 'A historic neighborhood famous for its colorful facades and balconies that open directly onto the sea — known for its popular cafés, ideal for watching the sunset.',
  description_el = 'Μια ιστορική γειτονιά διάσημη για τις πολύχρωμες προσόψεις της και τα μπαλκόνια που ανοίγουν απευθείας στη θάλασσα — γνωστή για τα δημοφιλή καφέ της, ιδανική για να απολαύσετε το ηλιοβασίλεμα.'
where slug = 'little-venice-alefkandra';

update public.attractions set
  description_en = 'Formed by the fusion of five separate chapels into one, this whitewashed church with its organic, sculptural form is one of the most photographed churches in Greece.',
  description_el = 'Σχηματισμένη από τη συγχώνευση πέντε ξεχωριστών εκκλησιών σε μία, αυτή η ασβεστωμένη εκκλησία με την οργανική, γλυπτική μορφή της είναι μία από τις πιο φωτογραφημένες εκκλησίες στην Ελλάδα.'
where slug = 'panagia-paraportiani-kilisesi';

update public.attractions set
  description_en = 'Reached by boat from Mykonos, this uninhabited UNESCO World Heritage island is regarded as the birthplace of Apollo and was one of the most important sacred centers of ancient Greece.',
  description_el = 'Προσβάσιμο με σκάφος από τη Μύκονο, αυτό το ακατοίκητο νησί, Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO, θεωρείται ο τόπος γέννησης του Απόλλωνα και ήταν ένα από τα σημαντικότερα ιερά κέντρα της αρχαίας Ελλάδας.'
where slug = 'delos-antik-kenti';

update public.attractions set
  description_en = 'A historic lighthouse dating from 1891 at the island''s northern tip — offering a breathtaking view over the Aegean Sea.',
  description_el = 'Ένας ιστορικός φάρος του 1891 στο βόρειο άκρο του νησιού — προσφέρει μια εκπληκτική θέα στο Αιγαίο Πέλαγος.'
where slug = 'armenistis-feneri';

-- Rodos

update public.attractions set
  description_en = 'A UNESCO World Heritage old town encircled by medieval walls, home to the magnificent Palace of the Knights of St. John.',
  description_el = 'Μια Παλιά Πόλη, Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO, περιτριγυρισμένη από μεσαιωνικά τείχη, όπου βρίσκεται το υπέροχο Παλάτι των Ιπποτών του Αγίου Ιωάννη.'
where slug = 'rodos-ortacag-sehri-buyuk-ustat-sarayi';

update public.attractions set
  description_en = 'Rising on a rocky hilltop above the white village of Lindos, the ruins of the ancient Temple of Athena Lindia — set against a stunning view of the bay.',
  description_el = 'Υψωμένη σε έναν βραχώδη λόφο πάνω από το λευκό χωριό της Λίνδου, τα ερείπια του αρχαίου Ναού της Αθηνάς Λινδίας — με εκπληκτική θέα στον κόλπο.'
where slug = 'lindos-akropolu';

update public.attractions set
  description_en = 'A shaded, cool valley where thousands of Jersey tiger moths gather each summer — a popular nature spot with hiking trails.',
  description_el = 'Μια σκιερή, δροσερή κοιλάδα όπου χιλιάδες πεταλούδες (Jersey tiger moth) συγκεντρώνονται κάθε καλοκαίρι — ένας δημοφιλής προορισμός φύσης με μονοπάτια πεζοπορίας.'
where slug = 'kelebekler-vadisi-rodos';

update public.attractions set
  description_en = 'Dating from the era of the Knights, one of the best-preserved medieval fortification walls in the world — visitors can walk the route along the moat.',
  description_el = 'Χρονολογούμενα από την εποχή των Ιπποτών, ένα από τα καλύτερα διατηρημένα μεσαιωνικά τείχη στον κόσμο — οι επισκέπτες μπορούν να περπατήσουν τη διαδρομή κατά μήκος της τάφρου.'
where slug = 'rodos-antik-sehir-surlari';

update public.attractions set
  description_en = 'A cool valley shaded by plane trees where seven natural springs converge — a dark tunnel leads through to a small lake.',
  description_el = 'Μια δροσερή κοιλάδα σκιασμένη από πλατάνια όπου συναντώνται επτά φυσικές πηγές — ένα σκοτεινό τούνελ οδηγεί σε μια μικρή λίμνη.'
where slug = 'yedi-kaynaklar-epta-piges';

-- Paros

update public.attractions set
  description_en = 'Meaning "Church of a Hundred Doors," this is one of Greece''s oldest Christian churches, dating back to the 4th century — located in the heart of Parikia.',
  description_el = 'Σημαίνει «Εκκλησία με τις Εκατό Πόρτες» και είναι μία από τις παλαιότερες χριστιανικές εκκλησίες της Ελλάδας, που χρονολογείται από τον 4ο αιώνα — στην καρδιά της Παροικιάς.'
where slug = 'panagia-ekatontapiliani-kilisesi';

update public.attractions set
  description_en = 'A half-submerged Venetian-era fortress at the entrance to Naoussa''s fishing harbor — a famous evening scene alongside the fishing boats.',
  description_el = 'Ένα μισοβυθισμένο ενετικό φρούριο στην είσοδο του ψαρολίμανου της Νάουσας — μια διάσημη βραδινή εικόνα δίπλα στις ψαρόβαρκες.'
where slug = 'naoussa-eski-liman-kalesi';

update public.attractions set
  description_en = 'A lush, cool valley within a monastery garden where thousands of butterflies gather each summer.',
  description_el = 'Μια πράσινη, δροσερή κοιλάδα μέσα σε έναν μοναστηριακό κήπο όπου χιλιάδες πεταλούδες συγκεντρώνονται κάθε καλοκαίρι.'
where slug = 'kelebekler-vadisi-paros';

update public.attractions set
  description_en = 'The island''s former capital — a mountain village famous for its narrow marble-paved streets, traditional Cycladic architecture and panoramic valley views.',
  description_el = 'Η πρώην πρωτεύουσα του νησιού — ένα ορεινό χωριό διάσημο για τα στενά μαρμαρόστρωτα δρομάκια του, την παραδοσιακή κυκλαδίτικη αρχιτεκτονική και την πανοραμική θέα στην κοιλάδα.'
where slug = 'lefkes-dag-koyu';

update public.attractions set
  description_en = 'The historic quarries where the famous Parian marble was extracted in antiquity — abandoned tunnels and galleries can be visited today.',
  description_el = 'Τα ιστορικά λατομεία απ'' όπου εξορυσσόταν το φημισμένο παριανό μάρμαρο στην αρχαιότητα — εγκαταλελειμμένες σήραγγες και στοές είναι επισκέψιμες σήμερα.'
where slug = 'marathi-mermer-ocaklari';

-- Milos

update public.attractions set
  description_en = 'Dating from the early Christian era, one of Greece''s most important underground burial sites — home to more than 1,500 graves.',
  description_el = 'Χρονολογούμενες από την πρώιμη χριστιανική περίοδο, μία από τις σημαντικότερες υπόγειες ταφικές τοποθεσίες της Ελλάδας — φιλοξενούν πάνω από 1.500 τάφους.'
where slug = 'milos-katakomplari';

update public.attractions set
  description_en = 'A Roman-era ancient theatre famous for its stunning setting overlooking the sea — it still hosts summer events today.',
  description_el = 'Ένα αρχαίο θέατρο της ρωμαϊκής εποχής, διάσημο για την εκπληκτική τοποθεσία του με θέα στη θάλασσα — φιλοξενεί ακόμη καλοκαιρινές εκδηλώσεις.'
where slug = 'milos-antik-tiyatrosu';

update public.attractions set
  description_en = 'A picture-perfect fishing village famous for its traditional "syrmata" — colorful-doored boat garages carved directly into the rock.',
  description_el = 'Ένα γραφικό ψαροχώρι, διάσημο για τα παραδοσιακά «συρμάτα» του — πολύχρωμες πόρτες σε λιμανάκια σκαλισμένα κατευθείαν στον βράχο.'
where slug = 'klima-balikci-koyu';

update public.attractions set
  description_en = 'Above the island''s capital, Plaka, the ruins of a Venetian castle offer a sunset view embracing the whole island and the Aegean.',
  description_el = 'Πάνω από την πρωτεύουσα του νησιού, την Πλάκα, τα ερείπια ενός ενετικού κάστρου προσφέρουν μια θέα ηλιοβασιλέματος που αγκαλιάζει όλο το νησί και το Αιγαίο.'
where slug = 'plaka-kalesi-gun-batimi';

update public.attractions set
  description_en = 'A surreal, almost lunar landscape of white volcanic rock sculpted by wind and water — also famous for its natural pools.',
  description_el = 'Ένα σουρεαλιστικό, σχεδόν σεληνιακό τοπίο από λευκό ηφαιστειακό βράχο σμιλεμένο από τον άνεμο και το νερό — διάσημο επίσης για τις φυσικές του πισίνες.'
where slug = 'sarakiniko-ay-yuzeyi-kayaliklari';

-- Kos

update public.attractions set
  description_en = 'One of antiquity''s most important healing and medical centers, where the teachings of Hippocrates were practiced — magnificent ruins spread across three terraces.',
  description_el = 'Ένα από τα σημαντικότερα θεραπευτικά και ιατρικά κέντρα της αρχαιότητας, όπου εφαρμόζονταν οι διδασκαλίες του Ιπποκράτη — υπέροχα ερείπια απλωμένα σε τρεις αναβαθμίδες.'
where slug = 'asklepion-antik-saglik-merkezi';

update public.attractions set
  description_en = 'A majestic medieval castle built by the Knights of St. John at the entrance to Kos harbor.',
  description_el = 'Ένα επιβλητικό μεσαιωνικό κάστρο χτισμένο από τους Ιππότες του Αγίου Ιωάννη στην είσοδο του λιμανιού της Κω.'
where slug = 'neratzia-kalesi';

update public.attractions set
  description_en = 'A massive plane tree over 500 years old, said to be where Hippocrates, "the father of medicine," taught his students in its shade.',
  description_el = 'Ένα τεράστιο πλατάνι, ηλικίας άνω των 500 ετών, όπου λέγεται ότι ο Ιπποκράτης, «ο πατέρας της ιατρικής», δίδασκε τους μαθητές του στη σκιά του.'
where slug = 'hipokrat-cinari';

update public.attractions set
  description_en = 'A mountain village on the slopes of Mount Dikeos, known for its traditional stone houses and Kos''s most famous sunset view.',
  description_el = 'Ένα ορεινό χωριό στις πλαγιές του όρους Δίκαιος, γνωστό για τα παραδοσιακά πέτρινα σπίτια του και την πιο διάσημη θέα ηλιοβασιλέματος της Κω.'
where slug = 'zia-koyu-gun-batimi';

update public.attractions set
  description_en = 'Located in the center of Kos Town, this museum showcases the island''s rich ancient history through Roman-era mosaics and sculptures.',
  description_el = 'Βρίσκεται στο κέντρο της πόλης της Κω και παρουσιάζει την πλούσια αρχαία ιστορία του νησιού μέσα από ρωμαϊκά ψηφιδωτά και γλυπτά.'
where slug = 'kos-arkeoloji-muzesi';

-- Naxos

update public.attractions set
  description_en = 'The massive marble gateway of the unfinished Temple of Apollo, rising on a small islet at the entrance to Naxos harbor — the island''s emblem.',
  description_el = 'Η τεράστια μαρμάρινη πύλη του ημιτελούς Ναού του Απόλλωνα, που υψώνεται σε ένα μικρό νησάκι στην είσοδο του λιμανιού της Νάξου — το έμβλημα του νησιού.'
where slug = 'portara-apollon-tapinagi-kapisi';

update public.attractions set
  description_en = 'A Venetian-era historic heart of the island with narrow stone streets — the castle ramparts offer views over the Cycladic Sea.',
  description_el = 'Η ενετική ιστορική καρδιά του νησιού με στενά πέτρινα δρομάκια — από τις επάλξεις του κάστρου η θέα εκτείνεται στο Κυκλαδικό πέλαγος.'
where slug = 'naxos-kalesi-eski-sehir';

update public.attractions set
  description_en = 'A traditional mountain village in the Cyclades famous for its streets entirely paved with marble — also known for its small museums.',
  description_el = 'Ένα παραδοσιακό ορεινό χωριό των Κυκλάδων, διάσημο για τους δρόμους του που είναι εξ ολοκλήρου πλακοστρωμένοι με μάρμαρο — γνωστό επίσης για τα μικρά μουσεία του.'
where slug = 'apiranthos-mermer-koyu';

update public.attractions set
  description_en = 'The ruins of a white marble temple dedicated to Demeter, goddess of the harvest, dating from the 6th century BC — set amid the fertile Naxos plain.',
  description_el = 'Τα ερείπια ενός λευκού μαρμάρινου ναού αφιερωμένου στη Δήμητρα, θεά του θερισμού, που χρονολογείται από τον 6ο αιώνα π.Χ. — στη μέση της εύφορης πεδιάδας της Νάξου.'
where slug = 'demeter-tapinagi';

update public.attractions set
  description_en = 'Giant unfinished archaic-era marble statues (kouroi) left abandoned in ancient stone quarries — open-air and free to visit.',
  description_el = 'Γιγάντια, ημιτελή αρχαϊκά μαρμάρινα αγάλματα (κούροι), εγκαταλελειμμένα σε αρχαία λατομεία — επισκέψιμα σε υπαίθριο χώρο.'
where slug = 'melanes-kuroslari';

-- Zakynthos

update public.attractions set
  description_en = 'A hidden cove ringed by sheer cliffs, made world-famous by the real shipwreck resting on its sands — Greece''s most photographed beach view.',
  description_el = 'Ένας κρυμμένος όρμος περιτριγυρισμένος από απόκρημνους βράχους, παγκοσμίως διάσημος για το πραγματικό ναυάγιο που αναπαύεται στην άμμο του — η πιο φωτογραφημένη παραλιακή θέα της Ελλάδας.'
where slug = 'navagio-gemi-enkazi-manzara-noktasi';

update public.attractions set
  description_en = 'Striking sea caves famous for their crystal-clear turquoise waters and natural rock arches — accessible only by boat.',
  description_el = 'Εντυπωσιακά θαλάσσια σπήλαια, διάσημα για τα κρυστάλλινα τιρκουάζ νερά τους και τα φυσικά βραχώδη τόξα τους — προσβάσιμα μόνο με σκάφος.'
where slug = 'mavi-magaralar-zakynthos';

update public.attractions set
  description_en = 'A hilltop above Zakynthos Town famous for its Venetian castle ruins and breathtaking sunset views over the bay.',
  description_el = 'Ένας λόφος πάνω από την πόλη της Ζακύνθου, διάσημος για τα ερείπια του ενετικού κάστρου του και την εκπληκτική θέα ηλιοβασιλέματος στον κόλπο.'
where slug = 'bochali-tepesi-gun-batimi';

update public.attractions set
  description_en = 'Venetian-era castle ruins on Bochali hill — also popular for its picnic areas set among pine forests.',
  description_el = 'Ερείπια ενετικού κάστρου στον λόφο Μπόχαλη — δημοφιλές και για τους χώρους πικνίκ ανάμεσα σε πευκοδάση.'
where slug = 'zakynthos-venedik-kalesi';

update public.attractions set
  description_en = 'One of the Mediterranean''s most important nesting grounds for the loggerhead sea turtle (Caretta caretta) — protected within the National Marine Park.',
  description_el = 'Ένας από τους σημαντικότερους τόπους φωλιάσματος της θαλάσσιας χελώνας Καρέτα καρέτα στη Μεσόγειο — προστατευόμενος εντός του Εθνικού Θαλάσσιου Πάρκου.'
where slug = 'laganas-korfezi-caretta-caretta-alani';

-- 020 migration'ında eklenen plajların eksik kalan İngilizce/Yunanca description çevirileri

update public.beaches set
  description_en = 'A quiet, uncrowded beach with white rock formations sculpted by wind and water, giving it an almost lunar appearance.',
  description_el = 'Μια ήσυχη, λιγότερο πολυσύχναστη παραλία με λευκούς βραχώδεις σχηματισμούς σμιλεμένους από τον άνεμο και το νερό, που της δίνουν μια σχεδόν σεληνιακή όψη.'
where slug = 'vlychada-plaji';

update public.beaches set
  description_en = 'Neighboring Paradise Beach, this popular spot offers two distinct atmospheres in one — a family-friendly section and a lively beach club scene.',
  description_el = 'Γειτονική με την Paradise, αυτή η δημοφιλής παραλία προσφέρει δύο διαφορετικές ατμόσφαιρες σε ένα μέρος — ένα οικογενειακό τμήμα και μια ζωντανή σκηνή beach club.'
where slug = 'super-paradise-beach';

update public.beaches set
  description_en = 'A long stretch of fine golden sand in one of Rhodes''s liveliest resort towns — famous for its water sports and nightlife.',
  description_el = 'Μια μακριά αμμουδιά με λεπτή χρυσή άμμο σε ένα από τα πιο ζωντανά τουριστικά θέρετρα της Ρόδου — διάσημη για τα θαλάσσια σπορ και τη νυχτερινή ζωή της.'
where slug = 'faliraki-plaji';

update public.beaches set
  description_en = 'Famous for its white sand and shallow turquoise waters, this lively resort beach is known for its water sports and beach bars.',
  description_el = 'Διάσημη για τη λευκή άμμο και τα ρηχά τιρκουάζ νερά της, αυτή η ζωντανή παραλία θέρετρο είναι γνωστή για τα θαλάσσια σπορ και τα beach bar της.'
where slug = 'santa-maria-plaji-paros';

update public.beaches set
  description_en = 'Famous for its colorful rock formations and golden sand, one of the most beautiful beaches on the island''s south coast — both peaceful and dramatically scenic.',
  description_el = 'Διάσημη για τους πολύχρωμους βράχους και τη χρυσή άμμο της, μία από τις ομορφότερες παραλίες στη νότια ακτή του νησιού — ήρεμη αλλά και εντυπωσιακή.'
where slug = 'firiplaka-plaji';

update public.beaches set
  description_en = 'A tiny hidden cove wedged between steep cliffs, reached by rope and ladder, with stunning turquoise waters.',
  description_el = 'Ένας μικροσκοπικός κρυμμένος όρμος στριμωγμένος ανάμεσα σε απόκρημνους βράχους, προσβάσιμος με σχοινί και σκάλα, με εκπληκτικά τιρκουάζ νερά.'
where slug = 'tsigrado-plaji';

update public.beaches set
  description_en = 'A tiny cove hidden among steep white cliffs, opening to the sea through a narrow canyon — one of Milos''s most photogenic spots.',
  description_el = 'Ένας μικροσκοπικός όρμος κρυμμένος ανάμεσα σε απόκρημνους λευκούς βράχους, που ανοίγει στη θάλασσα μέσα από ένα στενό φαράγγι — ένα από τα πιο φωτογενή σημεία της Μήλου.'
where slug = 'papafragas-plaji';

update public.beaches set
  description_en = 'A wide sandy beach on the shore of a quiet fishing village, known for its shallow waters and family-friendly atmosphere.',
  description_el = 'Μια φαρδιά αμμώδης παραλία στην ακτή ενός ήσυχου ψαροχωριού, γνωστή για τα ρηχά νερά και τη φιλική προς τις οικογένειες ατμόσφαιρά της.'
where slug = 'mastihari-plaji';

update public.beaches set
  description_en = 'Made up of two coves — one calm, the other with waves ideal for windsurfing — offering a versatile beach experience.',
  description_el = 'Αποτελείται από δύο όρμους — έναν ήρεμο και έναν με κύματα ιδανικά για windsurfing — προσφέροντας μια πολυδιάστατη εμπειρία παραλίας.'
where slug = 'mikri-vigla-plaji';

update public.beaches set
  description_en = 'A small cove surrounded by steep cliffs, famous for its deep turquoise waters — a peaceful and dramatically scenic beach.',
  description_el = 'Ένας μικρός όρμος περιτριγυρισμένος από απόκρημνους βράχους, διάσημος για τα βαθιά τιρκουάζ νερά του — μια ήρεμη και εντυπωσιακή παραλία.'
where slug = 'porto-limnionas';

-- 021 migration'ında eklenen restoranların eksik kalan İngilizce/Yunanca cuisine etiket çevirileri

update public.restaurants set cuisine_en = 'Gourmet Mediterranean', cuisine_el = 'Γκουρμέ Μεσογειακή' where slug = 'kaldera-isiklari';
update public.restaurants set cuisine_en = 'Meze & Ouzo', cuisine_el = 'Μεζέδες & Ούζο' where slug = 'yiannis-ouzerisi';
update public.restaurants set cuisine_en = 'Traditional Cycladic Cuisine', cuisine_el = 'Παραδοσιακή Κυκλαδίτικη Κουζίνα' where slug = 'bakalo-taverna';
update public.restaurants set cuisine_en = 'Modern Mediterranean', cuisine_el = 'Μοντέρνα Μεσογειακή' where slug = 'interni-restaurant';
update public.restaurants set cuisine_en = 'Gourmet Mediterranean', cuisine_el = 'Γκουρμέ Μεσογειακή' where slug = 'marco-polo-mansion';
update public.restaurants set cuisine_en = 'Seafood', cuisine_el = 'Θαλασσινά' where slug = 'ammos-beach-bar-rodos';
update public.restaurants set cuisine_en = 'Gourmet Mediterranean', cuisine_el = 'Γκουρμέ Μεσογειακή' where slug = 'levantis-restaurant';
update public.restaurants set cuisine_en = 'Traditional Cycladic Cuisine', cuisine_el = 'Παραδοσιακή Κυκλαδίτικη Κουζίνα' where slug = 'siparos-taverna';
update public.restaurants set cuisine_en = 'Seafood', cuisine_el = 'Θαλασσινά' where slug = 'armenaki-taverna';
update public.restaurants set cuisine_en = 'Gourmet Aegean Cuisine', cuisine_el = 'Γκουρμέ Αιγαιοπελαγίτικη Κουζίνα' where slug = 'alisachni';
update public.restaurants set cuisine_en = 'Traditional Aegean Cuisine', cuisine_el = 'Παραδοσιακή Αιγαιοπελαγίτικη Κουζίνα' where slug = 'ambavris-taverna';
update public.restaurants set cuisine_en = 'Italian-Greek Fusion', cuisine_el = 'Ιταλο-ελληνική Φιούζον' where slug = 'nonna-sofia';
update public.restaurants set cuisine_en = 'Traditional Aegean Cuisine', cuisine_el = 'Παραδοσιακή Αιγαιοπελαγίτικη Κουζίνα' where slug = 'to-elliniko-naxos';
update public.restaurants set cuisine_en = 'Seafood', cuisine_el = 'Θαλασσινά' where slug = 'palatia-taverna';
update public.restaurants set cuisine_en = 'Seafood', cuisine_el = 'Θαλασσινά' where slug = 'sarakina-bay-restaurant';
update public.restaurants set cuisine_en = 'Traditional Greek Cuisine', cuisine_el = 'Παραδοσιακή Ελληνική Κουζίνα' where slug = 'to-kanoni';
