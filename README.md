nocms-admin
=================

Common functionality for NoCMS Admins

Add to your Gemfile

```ruby
gem "nocms-admin", git: 'git@github.com:simplelogica/nocms-admin.git'
```

This gem is usually installed with *nocms-admin-pages*.

## Dependencies

NoCMS Admin requires these versions of SASS and JQuery in your Gemfile:

```
gem 'jquery-rails', '~> 3.1'
```
``` 
gem 'sass-rails', '~> 4.0'
``` 

Update your bundle:

``` 
bundle install
```

Mount NoCMS Admin in a route you find handy:

```ruby
mount NoCms::Admin::Engine => "/admin"
```

