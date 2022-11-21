# transcendence

### <strong>Description</strong>

This is not C or C++ basic functions ! To do something that you’ve never
done before whitout a piscine. Remind yourself at the beginning of your journey in
computer science. Now look where you are standing. Time to shine

> _Contributors:<br>_
>
> -   _<a href="https://github.com/alizaynoune">Ali Zaynoune</a> (<a href="https://profile.intra.42.fr/users/alzaynou">alzaynou</a>).<br>_
> -   _<a href="https://github.com/Ysrbolles">Yassir Bolles</a> (<a href="https://profile.intra.42.fr/users/ybolles">ybolles</a>)._
> -   _<a href="https://github.com/83wid">Nawfal Abouzaher</a> (<a href="https://profile.intra.42.fr/users/nabouzah">nabouzah</a>).<br>_

<!-- <p align="center">
  <img alt="war" src="https://user-images.githubusercontent.com/45235527/139450481-561e3ae8-f843-4d52-8d32-f36f4afca31e.gif" />
</p> -->

# Mandatory part

## I - 1 Overview

In this subject you will need to build a website for the mighty pong contest.
Your website will help user run pong tournament and play against each other.
There will be an admin view, chat with moderators, real time multiplayer online
games.
There will be guilds and wars!
You will need to follow thoses rules:

-   you must use the last stable version of every frameworks or libraries.
-   Your website backend should be written in NestJS.
-   You must use a postgresql database and no other databases.
-   The front end must be written with any typescript framework.
-   Your website should be a single page app, but user should be able to use the back
    button on the browser https://en.wikipedia.org/wiki/Singlepage_application
-   Your website must be usable on the latest version to date on Google Chrome,
    Firefox, Safari.
-   There must be no unhandled errors or warning when browsing through the website.
-   You can use any library.
-   Everything should run with a single call to docker-compose up –build

## I - 2 Security concerns

Because you are creating a fully-working website, there are a few security concerns that
you will have to tackle

-   Any password stored in your database must be encrypted
-   Your website must be protected against SQL injections
-   You must implement some kind of server-side validation for forms and any user
    input

## I - 3 User Account

-   A user must login using the oauth system of 42 intranet
-   A user must be able to choose a unique name that will be displayed on the website
-   A user has a number of victory and loss and other stats (ladder level, number of
    won tournaments, achievements etc...)
-   A user must have an avatar generated or uploaded by the user
-   A user must be able to activate a 2 factor authentication (like google authenticator
    or a sms etc...)
-   A user can be in 1 guild at a time
-   A user can add other users as friends, and see their current status (online, offline,
    in a game...)
-   Each user has a match history (including duel, ladder or tournaments games) that
    can be consulted by anyone logged-in

## I - 4 Chat

-   Users must be able to create channels public/private or protected by a password
-   Users must be able to send direct messages to other user
-   Users must be able to block other user and therefore they will not see their messages
    anymore
-   A user that create a new channel is automatically its owner until he leaves the
    channel - owner of a channel can add/change/remove a password to access to the channel - owner can select user to be administrator and is also administrator of the
    channel - administrator can ban or mute users for a certain amount of time
-   Through the chat interface users should be able to ask other player to do a Pong
    match
-   Through the chat interface users must be able to see other players profiles

## I - 5 Game

The main purpose of this website is to play pong against other players and show everyone
how good you are!
Therefor we should be able to play pong directly on the website and live against an
other player.
It can be in a canvas or it can be with 3d effects, it can be ugly but it must be a pong
like the one from 1972.
If you want to, you can add power ups, different maps etc... but user must be able to
play a default pong game without any added stuff.
The game must be responsive!
Other users can watch the game live without interfering in it.

# Requirements

-   docker
-   docker-compose
-   FORTYTWO_APP_ID
-   FORTYTWO_APP_SECRET
-   FORTYTWO_APP_CALLBACK_URL

# Installation

-   set values in server/.env
    `FORTYTWO_APP_ID`
    `FORTYTWO_APP_SECRET`
    `FORTYTWO_APP_CALLBACK_URL`
-   run commend line
    `docker-compse up --build`

# Results

# Video

![Watch the video](https://www.youtube.com/watch?v=optbXpKvQuk&t=14s&ab_channel=alizaynoune)

## Home

![home without signin](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/home1.png?raw=true)
![home](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/home2.png?raw=true)

## Profile

![profile friends](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/profileFriends.png?raw=true)
![profile lastMatches](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/profileLastMatches.png?raw=true)
![profile settings](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/profileSettings.png?raw=true)

## game

![game new](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/newGame.png?raw=true)
![game current](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/currentGame.png?raw=true)
![game view 1](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/game.png?raw=true)
![game view 2](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/game2.png?raw=true)

## achivements

![achivements](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/achivements.png?raw=true)

## chat

![chat](https://github.com/alizaynoune/ft_transcendence/blob/main/screenshots/chat.png?raw=true)
