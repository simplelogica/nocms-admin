$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "no_cms/admin/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "nocms-admin"
  s.version     = NoCms::Admin::VERSION
  s.authors     = ["Simplelogica"]
  s.email       = ["gems@simplelogica.net"]
  s.homepage    = "https://github.com/simplelogica/nocms-admin"
  s.summary     = "Common layout and functionalities for NoCMS custom admins."
  s.description = "Common layout and functionalities for NoCMS custom admins"

  s.files = Dir["{app,config,db,lib}/**/*", "LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", '~> 4.0', '>= 4.0.3'
  s.add_dependency 'sass-rails', '~> 4.0', '>= 4.0.0'
  s.add_dependency "jquery-rails", '~> 3.1'
  s.add_dependency "ckeditor", '~> 4.1.0'

  s.add_development_dependency "sqlite3"
end
