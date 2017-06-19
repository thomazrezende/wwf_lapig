/*
proximos passos:

4. verificar questão da sincronia de dados com filtros espaciaias
6. resolver problema das listas de municípios no area-filter *
7. clique no municipio no mapa chama aba relatório com dados do municipio

*/

console.log('--- module: map.js');

// UI

set('data_bt')
set('data_container')

set('indicators_bt')
set('areas_bt')
set('clear_filters')
set('filters')
set('category_filter')
set('area_filters')

set('report_bt')
set('map_report')
set('report_indicators')

$(dbody).addClass('data_mode')

data_container.open = true
$(data_bt).on('click', function(){
	if(data_container.open) close_data()
	else open_data()
	resize_map(animate2)
})

function close_data(){
	data_container.open = false
	$(dbody).removeClass('data_mode')
}

function open_data(){
	data_container.open = true
	$(dbody).addClass('data_mode')
}

function open_floating(bt){
	close_floatings()
	$(bt).addClass('on')
	bt.list.open = true
	$(bt.list).addClass('open')
}

function close_floatings(){
	$(indicators_bt).removeClass('on')
	$(areas_bt).removeClass('on')

	$(area_filters).removeClass('open')
	$(category_filter).removeClass('open')

	area_filters.open = false
	category_filter.open = false
}

$(indicators_bt).on('click',function(){
	if( this.list.open ){
		close_floatings()
	}else{
		open_floating(this)
	}
})

$(clear_filters).on('click',function(){
	close_floatings()
	set_area_filter(area_brasil)
	set_categ_filter(CATEG.itens[0])
})

function check_filters(){
	if(CATEG.id > 0 || AREA.id > 0 ) $(clear_filters).removeClass('off')
	else $(clear_filters).addClass('off')
}

$(areas_bt).on('click',function(){
	if( this.list.open ){
		close_floatings()
	}else{
		open_floating(this)
	}
})

indicators_bt.list = category_filter
areas_bt.list = area_filters


// LAYERS

function open_layers(){
	layers.open = true
	$(dbody).addClass('layers_mode')
	resize_map(animate2)
}

function close_layers(){
	layers.open = false
	$(dbody).removeClass('layers_mode')
	resize_map(animate2)
}

function close_layer(d){
	d.open = false
	$(d).removeClass('open')
}

function open_layer(d){
	reset_layers()
	d.open = true
	$(d).addClass('open')
}

var layers = elem('div', {trg:dbody})
$(layers)
.attr('id','layers')
.addClass('l1')
.addClass('animate2')

layers.open = false

var layers_bt = elem('div', {trg:map_controls})
$(layers_bt)
.attr('id','layers_bt')
.addClass('animate1')
.on('click',function(){
	open_layers()
})

var icon1 = elem('div', {id:'layers_bt_icon1', trg:layers_bt})
$(icon1)
.addClass('layer_icon')
.addClass('animate1')
.addClass('icon25')
.append(icons.layers)

var label = elem('span', {cls:'lg_layers', id:'layers_bt_label', trg:layers_bt, html: language['layers'][lang]})
var layers_counter = elem('span', { id:'layers_counter', cls:'counter animate1', trg:layers_bt })

var layers_top = elem('div', {id:'layers_top', cls:'animate1', trg:layers})
$(layers_top).on('click', function(i,d){
	close_layers()
})

var icon2 = elem('div', {id:'layers_top_icon', cls:'layer_bt_icon', trg:layers_top})
$(icon2)
.addClass('layer_icon')
.addClass('animate1')
.addClass('icon25')
.append(icons.layers)

var label2 = elem('div', { id:'layers_top_label', trg:layers_top, html: language['layers'][lang]})
var icon3 = elem('div', { id:'layers_top_x', cls:'icon15 layer_bt_icon', trg:layers_top})
$(icon3).append(icons.right)

var layers_list = elem('ul', {id:'layers_list', cls:'', trg:layers})

$(layers_list).sortable({
	axis: "y",
	handle:'.handle',
	revert: 100,
	scrollSensitivity: 10,
	scrollSpeed: 20,
	update: function( event, ui ) {
		var sortedIDs = $(layers_list).sortable( "toArray" );
		$(sortedIDs).each(function(i,d){
			var layer = get(d)
			//map
			$(map_layers).each(function(_i,_d){
				if(	_d.obj == layer.obj ){
					_d.setZIndex(sortedIDs.length - i )
				}
			})
		})
	}
}).disableSelection()

var msg_layers = elem('div', {cls:'no_indicators_msg', trg:layers})
$(msg_layers).html(language['no_indicators'][lang])

var msg_indicators = elem('li', {cls:'no_indicators_msg', trg:indicators})
$(msg_indicators).html(language['no_indicators'][lang])

var msg_report = elem('li', {cls:'no_indicators_msg', trg:report_indicators})
$(msg_report).html(language['no_indicators'][lang])

var sort_layers_msg = elem('div', {id:'sort_layers_msg', trg:layers})
$(sort_layers_msg).html(language['sort_msg'][lang])


function create_layer( d ){

	var layer = elem('li', { id: 'layer_' + d.id, trg:layers_list })
	$(layer)
	.addClass('layer')
	.addClass('animate')
	layer.open = false
	layer.off = false
	layer.obj = d

  layers_list.prepend(layer);

	var label1 = elem('div', { trg:layer })
	$(label1)
	.addClass('lb1')
	.addClass('animate1')
	.html( d.ano )
	// .html( d.area_label + ' | ' + d.ano )
	layer.label1 = label1

	var label2 = elem('div', { trg:layer })
	$(label2)
	.addClass('lb2')
	.addClass('animate1')
	.html( d.nome )
	layer.label2 = label2

	var eye = elem('div', { trg:layer })
	$(eye)
	.addClass('eye')
	.addClass('animate1')
	.addClass('icon15')
	.append( icons.eye )
	.on('click', function(){
		if(this.layer.off){
			this.layer.off = false
			$(this.layer).removeClass('off')
			toggle_layer(this.obj, true)
		}else{
			this.layer.off = true
			$(this.layer).addClass('off')
			toggle_layer(this.obj, false)
			if(this.layer.open){
				close_layer(this.layer)
			}
		}
	})
	eye.layer = layer
	eye.obj = d

	var arrow = elem('div', { trg:layer })
	$(arrow)
	.addClass('arrow')
	.addClass('animate1')
	.addClass('icon15')
	.append( icons.down )

	var handle = elem('div', { trg:layer })
	$(handle)
	.addClass('handle')
	.addClass('icon15')
	.append(icons.hamburguer)

	var content = elem('div', {trg:layer})
	$(content)
	.addClass('layer_content')
	.addClass('animate2')
	layer.content = content

	var legend = elem('img', {trg:content})
	$(legend).attr('src','http://m2.lapig.iesa.ufg.br/ows?EXCEPTIONS=application%2Fvnd.ogc.se_xml&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=' + d.id + '&format=image%2Fpng')

	var op_slider = elem('div', { cls:'op_slider', trg:content })
	var op_track = elem('div', { cls:'op_track', trg:op_slider })
	var op_label = elem('div', { cls:'op_label', trg:op_slider, html: language.opacity[lang] })
	var op_handle = elem('div', { cls:'ui-slider-handle', trg:op_slider, html:'100%' })

	$(op_slider).slider({
		value: 100,
		slide: function( event, ui ) {
			$(op_handle).text( ui.value + '%' )
			ui.handle.wms_layer.setOpacity(ui.value/100)
		}
	})

	var remove = elem('div', {trg:content, cls:'remove', html: language.remove[lang]})
	$(remove).on('click', function(){
		var ID = this.ID
		$(DATA.list).each(function(_i,_d){
			if(_d.id == ID) toggle_check_indicator(_d)
		})
	})
	remove.ID = d.id

	var download = elem('div', {trg:content, cls:'download', html: language.download[lang]})
	$(download).on('click', function(){
		 console.log('!!download ' + this.ID);
	})
	download.ID = d.id

	var hit = elem('div', { trg:layer })
	$(hit)
	.addClass('layer_hit')
	.on('click', function(){
		if( this.layer.open ) close_layer(this.layer)
		else if(!this.layer.off) open_layer(this.layer)
	})
	hit.layer = layer

	// map
	var ms_filter = '"[ANO]"="' + d.ano + '"'
	// if(d.regionType == 'estado' ) ms_filter +='AND "[UF]"="'+d.region+'"'
	// if(d.regionType == 'bioma' ) ms_filter +='AND "[BIOMA]"="'+d.region+'"'
	// if(d.regionType == 'municipio' ) ms_filter +='AND "[COD_MUNICI]"="'+d.region+'"'
	// if(d.regionType == 'bacia' ) ms_filter +='AND "[BIOMA]"="'+d.region+'"'

	console.log('ms_filter');
	console.log(ms_filter);

	var wms_layer = L.tileLayer.wms("http://maps.lapig.iesa.ufg.br/ows?", {
		layers: d.id,
		format: 'image/png',
		transparent: true,
		width:512,
		height:512,
		srs:'EPSG:900913',
		MSFILTER:ms_filter,
		updateWhenIdle:true
	});

	map.addLayer(wms_layer)

	wms_layer.obj = d
	wms_layer.layer = layer
	map_layers.push(wms_layer)
	wms_layer.setZIndex( map_layers.length )

	// refresh é FUNDAMENTAL sempre que incluir novos elementos
	$(layers_list).sortable('refresh')

	//slider > op_handle
	op_handle.wms_layer = wms_layer

}

function remove_layer(d){
	$(map_layers).each(function(_i,_d){
		if(_d.obj == d){
			// list
			$(_d.layer).remove()
			_d.layer = null
			// map
			map.removeLayer(_d)
			map_layers.splice( map_layers.indexOf(_d), 1)
			_d = null
		}
	})
}

function toggle_layer(d, show){
	$(map_layers).each(function(_i,_d){
		if(_d.obj == d){
			if(show) map.addLayer(_d)
			else map.removeLayer(_d)
		}
	})
}

function search_indicator(d){
	var ind
	$(DATA.list).each(function(_i,_d){
		if(d.region == _d.region && d.regionType == _d.regionType && d.id == _d.id){
			ind = _d
		}
	})
	return ind
}

/*
function create_mirror(d){
	var mirror = elem('li', {trg: report_indicators, cls:'indicator mirror'})
	d.mirror = mirror

	var icon_x = elem('div', { trg:mirror, cls:'icon uncheck animate1 icon25' })
	$(icon_x).append(icons.cXfull)
	$(icon_x).on('click', function(){
		console.log(this.indicator);
		toggle_check_indicator(this.indicator)
	})
	icon_x.indicator = search_indicator(d)

	var title = elem('label', {trg:mirror, cls:'animate1 title'})
	$(title).html(d.nome + ' | ' + d.area_label + ' | ' )

	var year = elem( 'span', { trg:title })
	$(year).html(d.ano)

	var data = elem('label', {trg:mirror, cls:'animate1 data'})
	$(data).html(format_number(d.valor) + ' ' + d.unidade)

}

function remove_mirror(d){
	// report list
	$(d.mirror).remove()
	d.mirror = null
}
*/

set('clear_report')

$(clear_report).on('click', function(){
	$(DATA.list).each(function(i,d){
		if(d.selected) toggle_check_indicator(d)
	})
})


// INDICATORS

var DATA = {}
set('indicators_list')
DATA.list = []
DATA.categs = ['all', 'selected']

// etapa 6
DATA.create_indicators_list = function(){

	var filters
	// indicators_list.innerHTML = ''
	// category_filter_ul.innerHTML = ''

	$(DATA.json).each(function(i,d){
		create_indicator(d)
		$(d.categ).each(function(_i,_d){
			var categ_norm = removeAccents(_d.toLowerCase())
			if(DATA.categs.indexOf(categ_norm) < 0) DATA.categs.push(categ_norm)
		})
	})

	// create indicator filters
	CATEG.itens = []

	$(DATA.categs).each(function(i,d){
		var lb = removeAccents(d.toLowerCase())
		create_categ_filter(i, lb, false)
	})

	set_categ_filter(CATEG.itens[0])
	check_indicators_on()

}


DATA.update_indicators_data = function(regionType, region){
	console.log("update_indicators_data!!");

	$(DATA.list).each(function(i,d){
		//label
		// $(d.area_label).html(get_area_label(regionType, region))
		// //dado
		// caso o issue SINCRONIA não seja possível de resolver, capturar novos dados assim:
		// 1. procurar ano atual no d.ano[]
		// 2. se achar, pegar o val_id
		// 3.1 true: buscar o valor com novo val_id
		// 3.2 false: retornar "valor não encontrado"
	})

}


function normalize_categs(arr){
	var r_arr = []
	$(arr).each(function(i,d){
		r_arr.push(removeAccents(d.toLowerCase()))
	})
	return r_arr
}

function get_area_label(type, reg) {
	var ret = ''
	if(type == 'brasil'){
		ret = language['brasil'][lang].toUpperCase()
	} else {
		switch( convert_lb(type) ){

			case 'Estados':
				$(AREA.json.Estados).each(function(i,d){
					if(reg == d.UF)	ret = d.ESTADO
				})

			case 'Municipios':

			case 'Biomas':

			case 'Regioes':

			case 'Bacias':

		}
	}
	return ret
}

// gambiarra: O lapig usa essas duas terminologias
// plural e capitular na lista de areas
// singular e lowercase na requisição dos jsons
// usado no get_area_label (acima) para usar o regionType
// no resgate do label da área da camada
function convert_lb(lb){
	switch (lb){
		case 'estado': return 'Estados'
		case 'municipio': return 'Municipios'
		case 'bioma': return 'Biomas'
		case 'regiao': return 'Regioes'
		case 'bacia': return 'Bacias'
	}
}

// etapa 7
function create_indicator(d){

	var indicator = elem('li', {trg:indicators_list, cls:'indicator animate2'})

	indicator.open = false
	indicator.selected = false
	indicator.id = d.id
	indicator.nome = d.nome
	indicator.descricao = d.descricao
	indicator.categ = normalize_categs(d.categ)
	indicator.unidade = d.unidade
	indicator.ano = d.ano.reverse()
	indicator.valor = d.valor.reverse()
	indicator.tipo = d.tipo
	indicator.val_id = 0
	// indicator.regionType = regionType
	// indicator.region = region
	// indicator.area_label = get_area_label(regionType, region)

	DATA.list.push(indicator)

	var icon_check = elem('div', { trg:indicator, cls:'icon check animate1 icon20' })
	$(icon_check).append(icons.cCheckFull)
	$(icon_check).on('click', function(){
		toggle_check_indicator(this.indicator)
	})
	icon_check.indicator = indicator

	var hit = elem('div', {trg:indicator, cls:'hit'})
	$(hit).on('click', function(){
		toggle_open_indicator(this.indicator)
	})
	hit.indicator = indicator

	var title = elem('label', {trg:indicator, cls:'animate1 title'})

	var title_name = elem('span', {trg:title, html:d.nome})
	// var title_div = elem('span', {trg:title, html:' | '})
	// indicator.area_label = elem('span', {trg:title, html:'BRASIL'})
	title_div = elem('span', {trg:title, html:' | '})

	var year = elem( 'span', { trg:title })
	indicator.year = year

	if( indicator.ano.length > 1 ){
		$(year)
		.addClass('plus')
		.html(indicator.ano[0] + ' (+)')
	}else{
		$(year).html(indicator.ano[0])
	}

	var data = elem('label', {trg:indicator, cls:'animate1 data'})
	$(data).html(format_number(indicator.valor[0]) + ' ' + d.unidade)
	indicator.data = data

	var arrow = elem('div', {trg:indicator, cls:'icon arrow animate1 icon15' })
	$(arrow).append(icons.down)

	var data_box = elem('div', {trg:indicator, cls:'data_box'})
	indicator.data_box = data_box

	var data_description = elem('div', {trg:data_box, cls:'data_description'})
	$(data_description).html(d.descricao)

	var data_box_bts = elem('div', {trg:data_box, cls:'data_box_bts'})
	var data_select = elem('select', {trg:data_box_bts, cls:'data_select animate2'})
	$(data_select)
	.attr('tabindex', -1)
	.on('change', function(){
		var val = $(this).val()
		this.indicator.val_id = val
		$(this.indicator.data).html( format_number(this.indicator.valor[val]) + ' ' + indicator.unidade )
		$(this.indicator.year).html( indicator.ano[val] + ' (+)' )
	})
	data_select.indicator = indicator

	var data_select_icon = elem('div', {trg:data_box_bts, cls:'data_select_icon icon15'})
	$(data_select_icon).append(icons.down)

	$(indicator.ano).each(function(_i,_d){
		var data_opt = elem('option', {trg:data_select, cls:'data_opt'})
		$(data_opt)
		.html(_d )
		.attr('value',_i)
		if(_i == indicator.ano[0]) $(data_opt).attr('selected','selected')
	})

	var data_add = elem('div', {trg:data_box_bts, cls:'data_add animate2'})
	$(data_add).on('click', function(){
		toggle_check_indicator(this.indicator)
	})
	data_add.indicator = indicator
	indicator.data_add = data_add

	var data_add_lb_off = elem('span', {trg:data_add, cls:'lb_off lg_add_to_report', html:'INCLUIR '})
	var data_add_lb_on = elem('span', {trg:data_add, cls:'lb_on lg_remove_from_report', html:' REMOVER'})

	var data_add_icon = elem('div', {trg:data_add, cls:'icon icon15 animate2'})
	$(data_add_icon).append(icons.plus)

}

function toggle_open_indicator(d){
	if(d.open){
		close_indicator(d)
	}else{
		reset_indicators()
		open_indicator(d)
	}
}

function open_indicator(d){
	d.open = true
	$(d)
	.addClass('open')
	.css({height: 130 + $(d.data_box).height()})
}

function close_indicator(d){
	d.open = false
	$(d)
	.removeClass('open')
	.css({height:''})
}

function reset_indicators(){
	$(DATA.list).each(function(i,d){
		if(d.open){
			close_indicator(d)
		}
	})
}

function reset_layers(){
	$(map_layers).each(function(i,d){
		close_layer(d.layer)
	})
}

function set_indicator(ind, sel){
	ind.selected = sel
	if(sel) $(ind).addClass('selected')
	else $(ind).removeClass('selected')
}

function toggle_check_indicator(d){
	if(d.selected){
		set_indicator(d,false)
		blink('out')
	}else{
		set_indicator(d,true)
		blink('in')
	}
	update_report(d)
}

function update_report(d){
	if(d.selected){
		var report_ind = {
			//region: d.region,
			//regionType: d.regionType,
			id: d.id,
			// area_label:d.area_label,
			ano:d.ano[d.val_id],
			valor:d.valor[d.val_id],
			unidade:d.unidade,
			nome:d.nome
		}
		create_layer(report_ind)
		// create_mirror(report_ind)
		report.list.push(report_ind)
	}else{
		console.log('remove');

		$(report.list).each(function(_i,_d){
			if( _d.id == d.id){
				remove_layer(_d)
				report.list.splice(_i,1)
				_d = null
			}
		})
	}

	check_categ()

	console.log('update_report: ', report);
	sessionStorage.setItem('report', JSON.stringify(report))
	count_report()
	check_layers()
}

function check_layers(){
	if(report.list.length > 0){
		$(msg_layers).hide()
		$(msg_report).hide()
		$(layers_list).show()
		$(sort_layers_msg).show()
	}else{
		$(msg_layers).show()
		$(msg_report).show()
		$(layers_list).hide()
		$(sort_layers_msg).hide()
	}
}

function blink(dir){
	$(report_bt).addClass('blink ' + dir)
	$(layers_bt).addClass('blink ' + dir)
	setTimeout(function(){
		$(report_bt).removeClass('blink ' + dir)
		$(layers_bt).removeClass('blink ' + dir)
	}, animate2)
}


// REPORT indicators

set('report_container')

$(report_bt).on('click',function(){
	if(report_container.open){
		close_report()
	}else{
		open_report()
		close_floatings()
	}
})

function close_report(){
	report_container.open = false
	$(report_container).removeClass('open')
}

function open_report(){
	report_container.open = true
	$(report_container).addClass('open')
}


// sessionStorage.clear()
var report = { list:[] }

function check_session_report(){
	var report_str = sessionStorage.getItem('report')
	if(report_str) report = JSON.parse(report_str)
	if(report.list.length > 0){
		$(report.list).each(function(i,d){
			// + create report_item
			create_layer(d)
			// create_mirror(d)
		})
		blink('in')
	}
}

function check_indicators_on(){
	$(report.list).each(function(i,d){
		$(DATA.list).each(function(_i,_d){
			if( d.id == _d.id ){
				set_indicator(_d, true)
			}
		})
	})
}


function count_report(){
	$(layers_counter).html( report.list.length )
	$(report_bt_counter).html( report.list.length )
}


//FILTERS
//categs

set('category_filter')
set('category_filter_ul')
set('indicators_bt_lb2')
var CATEG = {}
CATEG.itens = []
CATEG.id = 0

function create_categ_filter(i, lb, sel){
	var filter = elem('li', {trg:category_filter_ul})
	$(filter)
	.addClass( 'filter')
	.addClass( 'animate1')
	.addClass( sel ? ' selected' : '')
	.html(language[lb][lang])
	.on('click', function(){
		set_categ_filter(this)
	})
	filter.ID = i
	filter.categ = lb
	filter.lb = language[lb][lang]
	CATEG.itens.push(filter)
}

function set_categ_filter(itm){
	CATEG.id = itm.ID
	CATEG.name = itm.categ
	$(CATEG.itens).each(function(i,d){
		if(i == itm.ID) $(d).addClass('selected')
		else $(d).removeClass('selected')
	})

	check_categ()

	//bt label
	$(indicators_bt_lb2).html(itm.lb)

	close_floatings()
	check_filters()
}

function check_categ(){
	// indicators list
	var listed = 0
	$(DATA.list).each(function(i,d){
		if(CATEG.id == 0){
			$(d).removeClass('hide')
			listed++
		}else if( CATEG.id == 1 ){
			if( !d.selected ) {
				$(d).addClass('hide')
			}else{
				 $(d).removeClass('hide')
				 listed++
			}
		}else{
			if( d.categ.indexOf(CATEG.name) < 0 ){
				$(d).addClass('hide')
			}else{
				$(d).removeClass('hide')
				listed++
			}
		}
	})

	if(listed > 0) $(msg_indicators).hide()
	else $(msg_indicators).show()
}

// clear filters

// area filter

set('area_filters')
set('area_main_list')
set('area_main_ul')
set('areas_bt_lb2')
var AREA = {}
AREA.itens = []
AREA.municipios = []
AREA.id = 0
var d,m
var area_brasil
var search_bt, search_cancel_bt

// etapa 1
AREA.load_floating_lists = function(){

	AREA.current_list = area_main_ul

	area_brasil = area_filter_li( language['brasil'][lang], area_main_ul, false, 'brasil', 'brasil' )

	for( d in AREA.json ){
		var lb = removeAccents(d)
		create_area_list(area_main_ul, lb, AREA.json[d], true)
	}

	// indicators list
	var url = 'data/lista.json'
	ajax( url, DATA, 'create_indicators_list', [] )

	//default area
	set_area_filter(area_brasil)
}

function submit_search(){
	if(search.value != ''){
		$(search_bt).hide()
		$(search_cancel_bt).show()
	}
}

function reset_search(){
	$(search_cancel_bt).hide()
	$(search_bt).show()
}

window.onkeydown = function (event) {
	if(search.value != '' && search.focus ){
		if(event.which == 27){
			search.value = ''
		}
		if(event.which == 13){
			  submit_search()
		}
	}
}

// etapa 2
function create_area_list(bt_origin, lb, itens){

	var container = elem('div', {trg:area_filters, cls:'floating_list list_container animate2'})
	$(container).hide()

	// botão de acesso a essa lista (inserido em outra lista: bt_origin)
	area_filter_li(language[lb.toLowerCase()][lang], bt_origin, container, false, false )

	// cria espaço para botão back
	var back_bt = elem('div', {trg:container, cls:'floating_list_back'})
	$(back_bt).on('click', function(){
		$(this.container).hide()
	})
	back_bt.container = container

	var back_icon = elem('div', {trg:back_bt, cls:'animate1 icon icon15', apd:icons.left})
	var back_icon = elem('label', {trg:back_bt, cls:'animate1', html:language['back'][lang]})

	// cria lista
	var filter_ul = elem('ul', {trg: container, cls:'floating_list list_content'})
	// insere padding do bt voltar
	$(filter_ul).css({top:80, paddingTop:20, height:'calc(100% - 80px)'})

	// cria botões dentro da lista
	switch(lb){

		case 'Estados':
			sort_on(itens, 'ESTADO', false, false)
			$(itens).each(function(i,d){
				area_filter_li(d.ESTADO, filter_ul, false, 'estado', d.UF);
			})
		break

		case 'Municipios':

			// sobrescreve dados para acomodar search field
			$(filter_ul).css({top:80, paddingTop:20, height:'calc(100% - 160px)'})

			// search field
			var search = elem('input', {trg:container, id:'search'})
			$(search).attr('placeholder', language.search_city[lang])

			//search_bt
			search_bt = elem('div', {trg:container,  id:'search_bt'})
			$(search_bt).on('click', function(){
				submit_search()
			})

			var label = elem('label', {trg:search_bt, cls:'animate1 bt_label', html:language.search[lang]})
			var icon = elem('div', {trg:search_bt, cls:'icon icon25 animate1 bt_icon'})
			$(icon).append(icons.lupa)

			//search_cancel_bt
			search_cancel_bt = elem('div', {trg:container,  id:'search_cancel_bt'})
			$(search_cancel_bt).on('click', function(){
				reset_search()
			})
			$(search_cancel_bt).hide()

			var label = elem('label', {trg:search_cancel_bt, cls:'animate1 bt_label', html:language.cancel[lang]})
			var icon = elem('div', {trg:search_cancel_bt, cls:'icon icon25 animate1 bt_icon'})
			$(icon).append(icons.x)

			$(search).on('focus',function(){
				search.focus = true
				console.log(search.focus);
			})

			$(search).on('blur',function(){
				search.focus = false
				console.log(search.focus);
			})

			// lista de municípios
			for(var i in itens){
				$(itens[i]).each(function(_i,_d){
					var li = area_filter_li(i + ' - ' + _d.nome, filter_ul, false, 'municipio', _d.cod_mu);
					AREA.municipios.push(li)
				})
			}


		break

		case 'Biomas':
			sort_on(itens, 'BIOMA', false, false)
			$(itens).each(function(i,d){
				area_filter_li(d.BIOMA, filter_ul, false, 'bioma', d.BIOMA);
			})
		break

		case 'Regioes':
			sort_on(itens, 'nome', false, false)
			$(itens).each(function(i,d){
				area_filter_li(d.nome, filter_ul, false, 'regiao', d.nome);
			})
		break

		case 'Bacias':
			//sort
			// sem dados
		break

	}
}

// etapa 3
function area_filter_li(lb, trg, list, regionType, region){

	var filter = elem('li', {trg:trg})
	$(filter)
	.addClass( 'filter')
	.addClass( 'animate1')
	.html(lb)
	.on('click', function(){
		if(this.list) call_area_list(this.list)
		else set_area_filter(this)
	})

	if(list){
		var arrow = elem('div', {trg:filter, cls:'go icon15'})
		$(arrow).append(icons.right)
	}

	filter.lb = lb
	// filter.type = regionType ? language[regionType][lang] + ' : ' : ''
	filter.list = list
	filter.regionType = regionType
	filter.region = region
	AREA.itens.push(filter)
	filter.ID = AREA.itens.indexOf(filter)

	return filter

}

function call_area_list(list){
	// $(AREA.current_list).hide()
	$(list).show()
	AREA.current_list = list
}

// etapa 4
function set_area_filter(itm){
	console.log('set_area_filter: ' + itm.lb);
	var id = itm.ID
	AREA.id = id;
	$(AREA.itens).each(function(i,d){
		if(i==id) $(d).addClass('selected')
		else $(d).removeClass('selected')
	})
	$(areas_bt_lb2).html(itm.lb)
	close_floatings()
	check_filters()

	// 1 carrega dados novos nos indicadores

	var url = 'data/lista'
	if(itm.regionType != 'brasil' ) url += '_' + itm.regionType
	if(itm.region != 'brasil' ) url += '_' + itm.region
	url += '.json'

	ajax( url, DATA, 'update_indicators_data', [itm.regionType, itm.region] )


	// 2 carrega mascara no mapa


	/*
	mudança aqui: não será mais um recarregamento + gerar lista

	versao antiga:
	// etapa 5: call indicators list
	// var url = 'http://maps.lapig.iesa.ufg.br/indicadores/lista'
	// if(itm.regionType != 'brasil' && itm.region != 'brasil') url += '?regionType=' + itm.regionType + '&region=' + itm.region
	// + &lang=convert_lang(lang)

	var url = 'data/lista'
	if(itm.regionType != 'brasil' ) url += '_' + itm.regionType
	if(itm.region != 'brasil' ) url += '_' + itm.region
	url += '.json'

	ajax( url, DATA, 'create_indicators_list', [itm.regionType, itm.region] )

	*/

}

function convert_lang(lb){
	switch (lb){
		case '_pt': return 'pt-bt'
		case '_en': return 'en-us'
	}
}

//start

// etapa 0
ajax( 'data/regions.json', AREA, 'load_floating_lists', [] )
initMap()

// MAP REPORT
check_session_report()
count_report()
check_filters()
check_layers()
console.log('session_report: ', report);
