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
    @service = 'Spotify'

  elsif /pandora/ =~ speaker.now_playing[:uri]
    @album_art_url = speaker.now_playing[:album_art].gsub(/(^http:\/\/\d+.\d+.\d+.\d+\:\d+)/,'')
    @service = 'Pandora'
  end
  erb	:home

end