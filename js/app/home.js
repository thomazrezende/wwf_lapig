console.log('--- module: home');

set('explore_map')

$(explore_map).on('click', function(){
  navigate(1, 0, false)
})

initMap(4)
