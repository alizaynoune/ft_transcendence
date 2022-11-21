-- CREATE DATABASE TRANSCENDANCE;
-- USE TRANSCENDANCE;
-- ?achievemts types
CREATE TYPE level_type AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');
-- ?game levels
CREATE TYPE game_diff AS ENUM ('EASY', 'NORMAL', 'DIFFICULT');
-- ?game status
CREATE TYPE game_status AS ENUM('WAITING', 'PLAYING', 'END');
-- ?conversations types
CREATE TYPE conversation_type AS ENUM ('DIRECT', 'GROUP');
-- ?notifications types
CREATE TYPE NOTIFICATION_T AS ENUM (
  'FRIEND_REQUEST',
  'GAME_INVITE',
  'GAME_ACCEPTE',
  'OTHER'
);
-- ?achievements names
CREATE TYPE ACHIEV_NAME AS ENUM(
  'friendly',
  'legendary',
  'sharpshooter',
  'wildfire',
  'photogenic'
);
-- ?users status
CREATE TYPE STATUS_T AS ENUM ('ONLINE', 'OFFLINE', 'PLAYING');
-- ?create function auto update updated_at
CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now();
RETURN NEW;
END;
$$ language 'plpgsql';
-- ?create function auto update user xp from new achievement
CREATE OR REPLACE FUNCTION update_user_xp() RETURNS TRIGGER AS $$ BEGIN
UPDATE users
SET xp = users.xp + achievements.xp
FROM achievements
WHERE users.intra_id = NEW.userId
  AND achievements.name = NEW.achievementName
  AND achievements.level = NEW.achievementLevel;
RETURN NULL;
END;
$$ LANGUAGE 'plpgsql';
-- ?create auto update conversation updated_at whene insert a new message
CREATE OR REPLACE FUNCTION update_conversation() RETURNS TRIGGER AS $$ BEGIN
UPDATE conversation
SET updated_at = now()
WHERE conversation.id = NEW.conversationId;
RETURN NULL;
END;
$$ LANGUAGE 'plpgsql';
-- ?create table for users
CREATE TABLE users (
  id SERIAL NOT NULL unique,
  intra_id INT NOT NULL unique,
  username varchar(255) NOT NULL unique,
  email varchar(255) NOT NULL unique,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  status STATUS_T DEFAULT 'OFFLINE',
  xp INT DEFAULT 0,
  img_url varchar(255),
  cover varchar(255),
  two_factor_activate boolean DEFAULT false,
  two_factor_secret varchar(255),
  created_at timestamp DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  PRIMARY KEY (id)
);
-- ?create trigger auto update updated_at
CREATE TRIGGER trigger_update_timestamp BEFORE
UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
-- ?create table for conversations
CREATE TABLE conversation (
  id SERIAL,
  title varchar(40),
  type conversation_type DEFAULT 'DIRECT',
  active BOOLEAN DEFAULT true,
  public BOOLEAN DEFAULT false,
  protected BOOLEAN DEFAULT false,
  password varchar(225) DEFAULT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  PRIMARY KEY (id)
);
-- ?create table for conversation members
CREATE TABLE members (
  id SERIAL UNIQUE,
  conversationId INT NOT NULL,
  userId INT NOT NULL,
  mute BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  ban BOOLEAN DEFAULT false,
  endMute timestamp DEFAULT now(),
  endBan timestamp DEFAULT now(),
  isAdmin boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  FOREIGN KEY (userId) REFERENCES users (intra_id) ON DELETE CASCADE,
  FOREIGN KEY (conversationId) REFERENCES conversation (id) ON DELETE CASCADE,
  PRIMARY KEY (conversationId, userId)
);
-- ?create table for messages
CREATE TABLE message (
  id SERIAL,
  message TEXT,
  senderId INT NOT NULL,
  conversationId INT NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  FOREIGN KEY (senderId) REFERENCES users (intra_id) ON DELETE CASCADE,
  FOREIGN KEY (conversationId) REFERENCES conversation (id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);
-- ?create trigger auto increment user.xp by achievement.xp on insert
CREATE TRIGGER update_conversation
AFTER
INSERT ON message FOR EACH ROW EXECUTE FUNCTION update_conversation();
-- ?create table for Friends
CREATE TABLE friends (
  id SERIAL NOT NULL,
  userId INT NOT NULL,
  friendId INT NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  FOREIGN KEY (userId) REFERENCES users (intra_id),
  FOREIGN KEY (friendId) REFERENCES users (intra_id),
  PRIMARY KEY (id)
);
-- ?create table for Friends requests
CREATE TABLE invites (
  id SERIAL NOT NULL,
  senderId INT NOT NULL,
  receiverId INT NOT NULL,
  accepted BOOLEAN DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now(),
  FOREIGN KEY (senderId) REFERENCES users (intra_id),
  FOREIGN KEY (receiverId) REFERENCES users (intra_id),
  PRIMARY KEY (id)
);
-- ?create table for Blocked users
CREATE TABLE blocked (
  id SERIAL NOT NULL,
  userId INT NOT NULL,
  blockedId INT NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  FOREIGN KEY (userId) REFERENCES users (intra_id),
  FOREIGN KEY (blockedId) REFERENCES users (intra_id),
  PRIMARY KEY (id)
);
-- ?create table for games
CREATE TABLE game (
  id SERIAL NOT NULL,
  status game_status DEFAULT 'WAITING',
  level game_diff DEFAULT 'NORMAL',
  started boolean DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);
-- ?create table for players
CREATE TABLE players (
  id SERIAL NOT NULL,
  userId INT NOT NULL,
  gameId INT NOT NULL,
  score integer DEFAULT 0,
  ready boolean DEFAULT false,
  FOREIGN KEY (userId) REFERENCES users (intra_id) ON DELETE CASCADE,
  FOREIGN KEY (gameId) REFERENCES game (id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);
-- ?create table for gameInvites
CREATE TABLE gameInvites(
  id SERIAL NOT NULL,
  userId INT NOT NULL,
  fromId INT NOT NULL,
  gameId INT NOT NULL,
  accepted BOOLEAN DEFAULT false,
  FOREIGN KEY (userId) REFERENCES users (intra_id) ON DELETE CASCADE,
  FOREIGN KEY (fromId) REFERENCES users (intra_id) ON DELETE CASCADE,
  FOREIGN KEY (gameId) REFERENCES game (id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);
-- ?create table for notification
CREATE TABLE notification (
  id SERIAL,
  type NOTIFICATION_T NOT NULL DEFAULT 'OTHER',
  userId INT NOT NULL,
  fromId INT NOT NULL,
  targetId INT DEFAULT 0,
  content TEXT,
  read BOOLEAN DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  FOREIGN KEY (userId) REFERENCES users (intra_id) ON DELETE CASCADE,
  FOREIGN KEY (fromId) REFERENCES users (intra_id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);
-- ?create table for messages
CREATE TABLE achievements (
  id SERIAL UNIQUE,
  name ACHIEV_NAME NOT NULL,
  level level_type NOT NULL,
  xp int NOT NULL,
  description text,
  PRIMARY KEY(name, level)
);
-- ?create table for users_achievements
CREATE TABLE users_achievements (
  userId INT NOT NULL,
  achievementName ACHIEV_NAME NOT NULL,
  achievementLevel level_type,
  FOREIGN KEY (userId) REFERENCES users (intra_id) ON DELETE CASCADE,
  FOREIGN KEY (achievementName, achievementLevel) REFERENCES achievements (name, level) ON DELETE CASCADE,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  PRIMARY KEY (userId, achievementName, achievementLevel)
);
-- ?create trigger auto increment user.xp by achievement.xp on insert
CREATE TRIGGER users_achievements
AFTER
INSERT ON users_achievements FOR EACH ROW EXECUTE FUNCTION update_user_xp();
-- ?insert int achievements
INSERT INTO achievements(name, level, xp, description)
VALUES ('friendly', 'SILVER', 100, 'add 10 friends'),
  ('friendly', 'BRONZE', 200, 'add 20 friends'),
  ('friendly', 'GOLD', 500, 'add 50 friends'),
  ('friendly', 'PLATINUM', 1000, 'add 100 friends'),
  (
    'legendary',
    'SILVER',
    100,
    'win 1 matche with a max score'
  ),
  (
    'legendary',
    'BRONZE',
    250,
    'win 2 matches with max a score'
  ),
  (
    'legendary',
    'GOLD',
    350,
    'win 3 matches with max a score'
  ),
  (
    'legendary',
    'PLATINUM',
    500,
    'win 4 matches with max a score'
  ),
  (
    'sharpshooter',
    'SILVER',
    100,
    'win 2 matches in one day'
  ),
  (
    'sharpshooter',
    'BRONZE',
    250,
    'win 3 matches in one day'
  ),
  (
    'sharpshooter',
    'GOLD',
    350,
    'win 4 matches in one day'
  ),
  (
    'sharpshooter',
    'PLATINUM',
    500,
    'win 5 matches in one day'
  ),
  (
    'wildfire',
    'SILVER',
    500,
    'play 5 matches in one day'
  ),
  (
    'wildfire',
    'BRONZE',
    1400,
    'play 10 matches in one day'
  ),
  (
    'wildfire',
    'GOLD',
    2000,
    'play 15 matches in one day'
  ),
  (
    'wildfire',
    'PLATINUM',
    5000,
    'play 20 matches in one day'
  ),
  ('photogenic', 'GOLD', 50, 'change your avatar'),
  (
    'photogenic',
    'PLATINUM',
    50,
    'change your cover'
  );
-- -- -- ?for test insert into users
-- -- --TODO delete this insert (^_^)
-- INSERT INTO users (
--     intra_id,
--     username,
--     email,
--     first_name,
--     last_name,
--     status,
--     img_url
--   )
-- SELECT id,
--   'fakeUser' || id,
--   'fakeUser' || id || '@gmail.com',
--   'fake',
--   'user',
--   'OFFLINE',
--   'https://joeschmoe.io/api/v1/random'
-- FROM generate_series(1, 200) AS id;
-- INSERT INTO users (
--     intra_id,
--     username,
--     email,
--     first_name,
--     last_name,
--     img_url
--   )
-- VALUES (
--     51111,
--     'alizaynou',
--     'alzaynou@student.1337.ma',
--     'Ali',
--     'Zaynoune',
--     'https://cdn.intra.42.fr/users/alzaynou.jpg'
--   );
-- -- ?insert friend request
-- --TODO delete this insert (^_^)
-- INSERT INTO invites (senderId, receiverId)
-- SELECT id,
--   51111
-- FROM generate_series(1, 120) AS id;
-- -- ?insert notifications
-- --TODO delete this insert (^_^)
-- INSERT INTO notification (userId, fromId, content, type)
-- SELECT 51111,
--   id,
--   'send you friend request',
--   'FRIEND_REQUEST'
-- FROM generate_series(1, 120) AS id;
-- INSERT INTO game (status, started)
-- SELECT 'PLAYING',
--   true
-- FROM generate_series(1, 50) AS id;
-- INSERT INTO players (userId, gameId, ready)
-- SELECT id,
--   id,
--   true
-- FROM generate_series(1, 50) AS id;
-- INSERT INTO players (userId, gameId, ready)
-- SELECT id + 50,
--   id,
--   true
-- FROM generate_series(1, 50) AS id;