alter table public.islands add column description_en text;
alter table public.islands add column history_en text;
alter table public.islands add column best_time_to_visit_en text;

update public.islands set
  description_en = 'Famous for its unique sunsets, blue-domed churches and volcanic caldera views, Santorini is the most romantic and popular island in the Aegean.',
  history_en = 'Known in antiquity as Thera, Santorini took its current crescent shape after one of history''s largest volcanic eruptions around 1600 BC. Some theorists claim this is the site of the lost continent of Atlantis.',
  best_time_to_visit_en = 'September - October'
where slug = 'santorini';

update public.islands set
  description_en = 'Known for its cosmopolitan nightlife, historic windmills, maze-like streets and turquoise beaches, this is the Aegean''s premier party island.',
  history_en = 'According to Greek mythology, Mykonos was formed from the petrified bodies of giants slain by Herakles. It takes its name from Apollo''s grandson Mykons, and became a magnet for artists and celebrities from the 1950s onward.',
  best_time_to_visit_en = 'July - August'
where slug = 'mykonos';

update public.islands set
  description_en = 'An Ionian Sea paradise famous for the iconic Navagio (Shipwreck) Beach, towering limestone cliffs, and loggerhead sea turtles.',
  history_en = 'Zakynthos (or Zante) was under Venetian rule for centuries and was known as "Fior di Levante" (Flower of the East). Italian architecture and musical traditions have left a deep mark on the island''s culture.',
  best_time_to_visit_en = 'June - September'
where slug = 'zakynthos';

update public.islands set
  description_en = 'The largest of the Cyclades, known for its wide beaches, the ancient Portara gateway of the Temple of Apollo, and delicious local produce — ideal for families.',
  history_en = 'In mythology, Naxos is said to be where Zeus was raised, and where Theseus abandoned Ariadne after slaying the Minotaur. It became the seat of the Venetian Duchy of the Aegean in the Middle Ages.',
  best_time_to_visit_en = 'June - September'
where slug = 'naxos';

update public.islands set
  description_en = 'Birthplace of Hippocrates, the father of medicine, Kos is a popular Dodecanese island known for its rich historical ruins, extensive cycling paths and long sandy beaches.',
  history_en = 'The Asclepeion — the world''s first medical school and healing center — was founded here in antiquity. The historic Tree of Hippocrates, where he is believed to have taught his students in its shade, still stands at the island''s center. The island was long under Ottoman and Italian rule.',
  best_time_to_visit_en = 'June - September'
where slug = 'kos';
