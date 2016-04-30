require 'sinatra'
require 'sinatra/reloader' if development?
require 'sonos'
require 'pry'


get '/' do
  system = Sonos::System.new
  speaker = system.speakers.first
  @artist = speaker.now_playing[:artist]

  if /spotify/ =~ speaker.now_playing[:uri]
    @album_art_url = speaker.now_playing[:album_art]
    @service = "Spotify"

  elsif /pandora/ =~ speaker.now_playing[:uri]
    @album_art_url = speaker.now_playing[:album_art].gsub(/(^http:\/\/\d+.\d+.\d+.\d+\:\d+)/,'')
    @service = "Pandora"

  else 
    @album_art_url = "https://avatars1.githubusercontent.com/u/633390"
    @service = "Other"

  end

  erb	:home

end