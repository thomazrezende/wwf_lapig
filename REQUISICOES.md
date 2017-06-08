
AJAX

Acredito que consegui fazer o ajax funcionar, fiz alguns testes simulando o Ajax por aqui.
O teste que fiz foi o seguinte:

$.ajax({
    	url: "http://maps.lapig.iesa.ufg.br/indicadores/lista",
    	type: "GET",
 		crossDomain: true,
    	dataType: 'json',
    	success: function(result){
            console.log(result)
    	},
    	error:function(xhr, status){
     		 console.log("error")
 		}
   });

Assim consegui obter o Success. hehehe
Alterei o tipo de requisição para "GET".

---------------

REGIÕES

http://maps.lapig.iesa.ufg.br/indicadores/regions

-------------

INDICADORES

Todo o Brasil:
http://maps.lapig.iesa.ufg.br/indicadores/lista

Estado de Goiás: http://maps.lapig.iesa.ufg.br/indicadores/lista?regionType=estado&region=GO

Município de Goiânia : http://maps.lapig.iesa.ufg.br/indicadores/lista?regionType=municipio&region=5208707

Bioma Cerrado: http://maps.lapig.iesa.ufg.br/indicadores/lista?regionType=bioma&region=CERRADO

Região do Arco do Desmatamento: http://maps.lapig.iesa.ufg.br/indicadores/lista?regionType=regiao&region=Arco%20do%20Desmatamento

Parâmetros utilizados:

regionType: Tipo da região (estado, municipio, bioma, regiao)
region: A região especifica, o estado (receberá a UF), o municipio (receberá o código do município), o bioma e regiões (Arco do Desmatamento e MATOPIBA)

---------------

camadas

LAYERS: desmatamento
FORMAT:image/png
TRANSPARENT:TRUE
VERSION:1.1.1
SERVICE:WMS
REQUEST:GetMap
STYLES:
SRS:EPSG:4674
BBOX:-73.990630,-32.919380,-32.350115,5.272225
WIDTH:196
HEIGHT:202
MSFILTER: "[UF]"="GO"

Seguem alguns exemplos de URL com os parâmetros:

Esta URL traz a camada de "Area plantada de Soja" no ano de 2005: http://maps.lapig.iesa.ufg.br/ows?LAYERS=area_soja&FORMAT=image%2Fpng&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetMap&STYLES=&SRS=EPSG%3A900913&BBOX=-8200300,-3996220,-3190922.915,1013157.085&WIDTH=512&HEIGHT=512&MSFILTER="[ANO]"="2005"

Esta URL traz a camada de "Desmatamento" no ano de 2014 no Bioma Cerrado : http://maps.lapig.iesa.ufg.br/ows?LAYERS=desmatamento&FORMAT=image%2Fpng&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetMap&STYLES=&SRS=EPSG%3A900913&BBOX=-8200300,-3996220,-3190922.915,1013157.085&WIDTH=512&HEIGHT=512&MSFILTER="[ANO]"="2014"AND"[BIOMA]"="CERRADO"

Esta URL traz a camada de "Trabalho Escravo" no ano de 2002 para o estado de Goiás: http://maps.lapig.iesa.ufg.br/ows?LAYERS=trabalho_escravo&FORMAT=image%2Fpng&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetMap&STYLES=&SRS=EPSG%3A900913&BBOX=-8200300,-3996220,-3190922.915,1013157.085&WIDTH=512&HEIGHT=512&MSFILTER="[ANO]"="2002"AND"[UF]"="GO"
Esta URL traz a camada de "Unidade de conservação integral para todo o Brasil" : http://maps.lapig.iesa.ufg.br/ows?LAYERS=unidades_conservacao_integral&FORMAT=image%2Fpng&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetMap&STYLES=&SRS=EPSG%3A900913&BBOX=-8200300,-3996220,-3190922.915,1013157.085&WIDTH=512&HEIGHT=512&MSFILTER="[COD_MUNICI]"!="0"

Como você pode perceber a filtragem é feita pelo parâmetro "MSFILTER", basta utilizá-lo como se fosse um "Where" no banco de dados.
