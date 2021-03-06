require 'sinatra'
require 'sinatra/reloader' if development?
require 'sonos'
require 'pry'
require 'musix_match'
require 'json'

set :bind, '0.0.0.0'
set :environment, :production #fuck off NoMethodError debug

MusixMatch::API::Base.api_key = ENV["MUSIX_MATCH_API_KEY"]

get '/' do
  system = Sonos::System.new
  begin
    speaker = system.speakers.first
  rescue
    @artist = "Artist X"
    @title = "Yo Momma!"
    @album = "Yo Momma's greatest hits"
  end
  @artist = speaker.now_playing[:artist]
  @title = speaker.now_playing[:title]
  @album = speaker.now_playing[:album]

  if /spotify/ =~ speaker.now_playing[:uri]
    @album_art_url = speaker.now_playing[:album_art]
    @service = "Spotify"
  elsif /pandora/ =~ speaker.now_playing[:uri]
    @album_art_url = speaker.now_playing[:album_art].gsub(/(^http:\/\/\d+.\d+.\d+.\d+\:\d+)/,'')
    @service = "Pandora"
  elsif /prime/ =~ speaker.now_playing[:uri]
    @album_art_url = speaker.now_playing[:album_art]
    @service = "Amazon Prime Music"
  else
    @album_art_url = "https://avatars1.githubusercontent.com/u/633390"
    @service = "Other"
  end

  erb	:home
end

get '/refresh.json' do
  content_type :json
  system = Sonos::System.new
  begin
    speaker = system.speakers.first
  rescue
    speaker.is_playing? == false
  end

  if speaker.is_playing?
      @uri = speaker.now_playing[:uri]
      @state = "playing"
  else
      @uri = nil
      @state = "not_playing"
  end

  { :state => @state, :uri => @uri }.to_json
end