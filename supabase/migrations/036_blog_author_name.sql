-- Blog yazar imzası jenerik "Yunanisland Editörü" yerine gerçek isim olsun.
alter table public.articles alter column author_name set default 'Salih Tombuloğlu';
update public.articles set author_name = 'Salih Tombuloğlu';
