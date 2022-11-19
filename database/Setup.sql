-- CREATE DATABASE TRANSCENDANCE;
-- USE TRANSCENDANCE;
CREATE TYPE level_type AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

CREATE TYPE game_diff AS ENUM ('EASY', 'NORMAL', 'DIFFICULT');

CREATE TYPE conversation_type AS ENUM ('DIRECT', 'GROUP');

CREATE TYPE NOTIFICATION_T AS ENUM ('FRIEND_REQUEST', 'GAME_INVITE', 'OTHER');

CREATE TYPE STATUS_T AS ENUM ('ONLINE', 'OFFLINE', 'PLAYING');

-- create table for users
CREATE TABLE users (
  id SERIAL NOT NULL unique,
  intra_id INT NOT NULL unique,
  username varchar(255) NOT NULL unique,
  email varchar(255) NOT NULL unique,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  img_url varchar(255),
  cover varchar(255),
  status STATUS_T DEFAULT 'OFFLINE',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  PRIMARY KEY (id)
);

-- create table for all conversation
CREATE TABLE conversation (
  id SERIAL NOT NULL unique,
  name varchar(255),
  type conversation_type DEFAULT 'DIRECT',
  PRIMARY KEY (id)
);

-- create table for for group members 
CREATE TABLE group_member (
  id SERIAL NOT NULL unique,
  user_id SERIAL NOT NULL,
  conversation_id SERIAL NOT NULL,
  joint_date timestamp DEFAULT now(),
  left_date timestamp,
  FOREIGN KEY (user_id) REFERENCES users (intra_id),
  FOREIGN KEY (conversation_id) REFERENCES conversation (id),
  PRIMARY KEY (id)
);

-- create table for messages
CREATE TABLE message (
  id SERIAL NOT NULL unique,
  sender_id SERIAL NOT NULL,
  content text NOT NULL,
  conversation_id SERIAL NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  read_by integer [],
  delivered_to integer [],
  PRIMARY KEY (id),
  FOREIGN KEY (sender_id) REFERENCES users (intra_id),
  FOREIGN KEY (conversation_id) REFERENCES conversation (id)
);

-- create table for Friends
CREATE TABLE friends (
  id SERIAL NOT NULL,
  userId SERIAL NOT NULL,
  friendId SERIAL NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  FOREIGN KEY (userId) REFERENCES users (intra_id),
  FOREIGN KEY (friendId) REFERENCES users (intra_id),
  PRIMARY KEY (id)
);

-- create table for Friends requests
CREATE TABLE invites (
  id SERIAL NOT NULL,
  senderId SERIAL NOT NULL,
  receiverId SERIAL NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  accepted BOOLEAN DEFAULT false,
  FOREIGN KEY (senderId) REFERENCES users (intra_id),
  FOREIGN KEY (receiverId) REFERENCES users (intra_id),
  PRIMARY KEY (id)
);

-- create table for Blocked users
CREATE TABLE blocked (
  id SERIAL NOT NULL,
  userId SERIAL NOT NULL,
  blockedId SERIAL NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  FOREIGN KEY (userId) REFERENCES users (intra_id),
  FOREIGN KEY (blockedId) REFERENCES users (intra_id),
  PRIMARY KEY (id)
);

-- create table for messages
CREATE TABLE game (
  id SERIAL NOT NULL,
  player integer [],
  level game_diff DEFAULT 'NORMAL',
  scores integer [],
  PRIMARY KEY (id)
);

-- create table for notification
CREATE TABLE notification (
  id SERIAL,
  type NOTIFICATION_T NOT NULL DEFAULT 'OTHER',
  userId SERIAL NOT NULL,
  fromId SERIAL NOT NULL,
  targetId SERIAL NOT NULL,
  content TEXT,
  createdAt timestamp NOT NULL DEFAULT now(),
  updatedAt timestamp NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (intra_id),
  FOREIGN KEY (fromId) REFERENCES users (intra_id),
  PRIMARY KEY (id)
);

-- create table for messages
CREATE TABLE achievements (
  id SERIAL NOT NULL,
  name VARCHAR(25) NOT NULL,
  level level_type DEFAULT 'BRONZE',
  xp int NOT NULL,
  description text,
  PRIMARY KEY (id)
);

-- create table for users_achievements
CREATE TABLE users_achievements (
  id SERIAL NOT NULL,
  userId INT NOT NULL,
  achievementId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (intra_id),
  FOREIGN KEY (achievementId) REFERENCES achievements (id),
  createdAt timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

INSERT INTO
  achievements(name, level, xp, description)
VALUES
  ('friendly', 'SILVER', 100, 'description'),
  ('friendly', 'BRONZE', 200, 'description'),
  ('friendly', 'GOLD', 300, 'description'),
  ('friendly', 'PLATINUM', 500, 'description'),
  ('legendary', 'SILVER', 100, 'description'),
  ('legendary', 'BRONZE', 200, 'description'),
  ('legendary', 'GOLD', 300, 'description'),
  ('legendary', 'PLATINUM', 500, 'description'),
  ('sharpshooter', 'SILVER', 100, 'description'),
  ('sharpshooter', 'BRONZE', 200, 'description'),
  ('sharpshooter', 'GOLD', 300, 'description'),
  ('sharpshooter', 'PLATINUM', 500, 'description'),
  ('wildfire', 'SILVER', 100, 'description'),
  ('wildfire', 'BRONZE', 200, 'description'),
  ('wildfire', 'GOLD', 300, 'description'),
  ('wildfire', 'PLATINUM', 500, 'description'),
  ('winner', 'SILVER', 100, 'description'),
  ('winner', 'BRONZE', 200, 'description'),
  ('winner', 'GOLD', 300, 'description'),
  ('winner', 'PLATINUM', 500, 'description'),
  ('photogenic', 'GOLD', 300, 'description'),
  ('photogenic', 'PLATINUM', 500, 'description');

INSERT INTO
  users (
    intra_id,
    username,
    email,
    first_name,
    last_name,
    img_url,
    cover
  )
VALUES
  (
    51111,
    'alizaynou',
    'alzaynou@student.1337.ma',
    'Ali',
    'Zaynoune',
    'https://cdn.intra.42.fr/users/alzaynou.jpg',
    'https://random.imagecdn.app/1800/800'
  );

INSERT INTO
  users (
    intra_id,
    username,
    email,
    first_name,
    last_name,
    img_url,
    cover
  )
SELECT
  id,
  'alizaynoune' || id,
  'zaynoune' || id || '@ali.ali',
  'ali',
  'zaynoune',
  'https://joeschmoe.io/api/v1/random',
  'https://random.imagecdn.app/1800/800'
FROM
  generate_series(1, 30) AS id;

INSERT INTO
  invites (senderId, receiverId)
SELECT
  id,
  51111
FROM
  generate_series(1, 30) AS id