
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



1. Combinado, aguardo definições mas isso é simples de implementar quando for decidido, isso pode levar no máximo 2 dias.

2. Para puxar as informações da camada em um ponto específico, utilizamos o GetFeatureInfo do WMS. Veja esses exemplos:
https://gist.github.com/rclark/6908938
https://gis.stackexchange.com/questions/177444/wms-getfeatureinfo-and-leaflet
http://profmarcello.blogspot.com.br/2014/08/wms-getfeatureinfo-utilizando-mapserver.html
http://docs.geoserver.org/stable/en/user/services/wms/reference.html

3. Quanto ao Download eu estarei verificando, pois essa requisição deve ser criada por nós. Vou dar analisar a melhor estratégia e te aviso.

4. Certo, aguardo as paletas para que possamos realizar as alterações. Isso também é algo rápido que pode ser feito em no máximo 2 dias.

4.1 A legenda é gerada conforme o SLD que definirmos para a camada, segue alguns exemplos:
Camada de Agricultura Anual: http://m2.lapig.iesa.ufg.br/ows?EXCEPTIONS=application%2Fvnd.ogc.se_xml&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=or_mp_agricultura_ni_2014_agrosatelite&format=image%2Fpng
Indicador Desmatamento: http://m2.lapig.iesa.ufg.br/ows?EXCEPTIONS=application%2Fvnd.ogc.se_xml&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=desmatamento&format=image%2Fpng
Indicador de área plantada de soja: http://m2.lapig.iesa.ufg.br/ows?EXCEPTIONS=application%2Fvnd.ogc.se_xml&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=area_soja&format=image%2Fpng
Indicador de trabalho escravo: http://m2.lapig.iesa.ufg.br/ows?EXCEPTIONS=application%2Fvnd.ogc.se_xml&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=trabalho_escravo&format=image%2Fpng
Indicador de Unidades de Conservação integral: http://m2.lapig.iesa.ufg.br/ows?EXCEPTIONS=application%2Fvnd.ogc.se_xml&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=unidades_conservacao_integral&format=image%2Fpng
*Como foi possível notar a requisição OWS para trazer a legenda é a mesma para qualquer camada, o que muda é só o ID. A legenda virá em formato de imagem PNG, as cores e o texto da legenda são passíveis de alteração.

5. Thomaz, nos organizamos os dados utilizando a ferramenta QGis, conversei com o pessoal e descobri que a ferramenta tem um mecanismo que gera círculos. Como os dados são por municípios, eles teriam que ser menores seguindo um padrão. Vou te mostrar alguns exemplos de dados que temos organizados dessa forma:
http://maps.lapig.iesa.ufg.br/?layers=pa_br_matadouros_e_frigorificos_na_2014_lapig
http://maps.lapig.iesa.ufg.br/?layers=pa_br_aerodromo_1000_2009_ibge
http://maps.lapig.iesa.ufg.br/?layers=pa_br_peq_centrais_hidreletricas_1000_2010_aneel
http://maps.lapig.iesa.ufg.br/?layers=pa_br_estacao_fluviometricas_1000_2010_ana
*No caso das camadas de Área de Soja e Trabalho Escravo, Poderíamos gerar dessa forma, teria um símbolo (Círculo) em cada município com resultado maior que 0. Podemos fazer esse círculo maior, para que não fique parecendo a localização. O que você acha? Se quiser posso fazer um exemplo e lhe enviar.

6. Todo o visual da plataforma foi construído com o Framework "ExtJS", utilizamos o "Slider" para fazer aquela barra de transparência. Veja a documentação: http://www.objis.com/formationextjs/lib/extjs-4.0.0/docs/api/Ext.slider.Single.html

7. Esse ranking, eu precisaria de no máximo 1 semana para realizar essa implementação.

Quanto ao outro e-mail enviado sobre o tempo de carregamento da camada, nós utilizamos o Redis, uma espécie de servidor que armazena cache.

Thomaz, devido ao evento que vamos participar apresentando o trabalho do Lapig o "Simpósio Brasileiro de Sensoriamento Remoto". Essa semana estamos atualizando os dados do portal, está um tanto corrido pois viajamos na Sexta feira de madrugada. Será toda a semana que vem em evento. Neste caso o prazo que lhe disse seria contado da semana de 5 a 9 de Junho, nessa semana eu acredito que consigo terminar todas essas solicitações apresentadas. Então o prazo máximo para entrega seria até o dia 09 de Junho, porém conforme forem finalizando cada tarefa já iria te enviando. O que você acha?

Se desejar marcar algum Call hoje ou Quinta-Feira, estarei disponível. E durante a semana que vem que estarei fora, podemos conversar por e-mail se necessário.

Abs.
