
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
