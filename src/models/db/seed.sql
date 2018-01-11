INSERT INTO users
  (name, email, encrypted_password)
VALUES
  ('Somaya', 'somaya@somaya.com', '$2a$10$dbOW6pfarskkvO5eW234OuHWW/hVAMUWmhHOokvfYvuWXvQefKLzS'),
  ('Bernie', 'bernie@bernie.com', '$2a$10$vI36zrjVAV9wjJW5sU7v3eeNN7EFZ.cYAvcfhRiS5w7akkWClZpce')
;


INSERT INTO reviews
  (content, user_id, album_id, rating)
VALUES
  ('Malibu is an expansive opus that flows in multiple directions like a classic 70s double album.', 1, 1, 5),
  ('Solange’s new record is stunning, a thematically unified and musically adventurous statement on the pain and joy of black womanhood.', 2, 2, 4),
  ('Her second album is a masterful study of being a young woman, a sleek and humid pop record full of grief and hedonism, crafted with the utmost care and wisdom.', 1, 3, 3),
  ('In Rainbows represents the sound of Radiohead coming back to earth.', 2, 4, 3)
;
