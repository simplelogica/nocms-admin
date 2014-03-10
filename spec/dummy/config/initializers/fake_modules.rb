NoCms::Admin.menu_items << { name: 'pages', url: '' }
NoCms::Admin.menu_items << { name: 'blog', url: '', children:[
  { name: 'posts', url: '', children:[
    { name: 'drafts', url: '' }
  ]},
  { name: 'categories', url: '' },
  { name: 'authors', url: '' }
]}
