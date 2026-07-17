-- Cover photos for the 4 islands that had none (Rhodes, Paros, Milos, Naxos).
-- Images are freely-licensed (CC0 / CC BY / CC BY-SA) photos from Wikimedia
-- Commons, downloaded and resized to match the existing photo dimensions:
--   naxos.jpg  - Manfred Werner (Tsui), CC BY-SA 4.0
--   paros.jpg  - François F.-Dubois, CC BY-SA 3.0
--   milos.jpg  - dronepicr, CC BY 2.0
--   rodos.jpg  - Jebulon, CC0

update islands set cover_image_url = case slug
  when 'naxos' then '/naxos.jpg'
  when 'paros' then '/paros.jpg'
  when 'milos' then '/milos.jpg'
  when 'rodos' then '/rodos.jpg'
end
where slug in ('naxos', 'paros', 'milos', 'rodos');

insert into media (entity_type, entity_id, url, media_type)
select 'island', id, '/naxos.jpg', 'photo' from islands where slug = 'naxos'
union all
select 'island', id, '/paros.jpg', 'photo' from islands where slug = 'paros'
union all
select 'island', id, '/milos.jpg', 'photo' from islands where slug = 'milos'
union all
select 'island', id, '/rodos.jpg', 'photo' from islands where slug = 'rodos';
