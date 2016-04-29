
Template.index.onCreated( function() {
    Template.instance().subscribe( 'template' );
    this.subscribe( 'placemark' );

});


Template.index.helpers({
    pm: function () {
        var naoinserido = false;

        resultadoConsultaPlacemarks = Placemarks.find().fetch();

        if(renderizouPivotTable) {
            drawPivot();
            LINHAS.forEach(function(doc) {
                naoinserido = false;
                features.forEach(function(feature,index,vetor) {if(feature.getId()==doc.atributos[0]) {naoinserido=true;} } );
                if(naoinserido==false) {drawPolygon(doc.atributos[3],doc.atributos[0],doc.atributos[1])}
            }
        );
    }

    /*
    Placemarks.find().forEach(function(doc) {
    naoinserido = false;
    features.forEach(function(feature,index,vetor) {if(feature.getId()==doc._id) {naoinserido=true;} } );
    if(naoinserido==false) {drawPolygon(doc.coordenadas,doc._id,doc.nome)}
}
);

*/


return "classX";

}
});


Template.index.onRendered( function() {

    drawPivot();
    renderizouPivotTable = true;
    LINHAS.forEach(function(doc) {
        naoinserido = false;
        features.forEach(function(feature,index,vetor) {if(feature.getId()==doc.atributos[0]) {naoinserido=true;} } );
        if(naoinserido==false) {drawPolygon(doc.atributos[3],doc.atributos[0],doc.atributos[1])}
    }
);
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################
// ##################################################################


$('#map').height($(window).height() - $('#map').offset().top-$('.page-footer').innerHeight()-25);
$(document).ready(function(){
    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
});

$(".dropdown-button").dropdown();

/**
* Elements that make up the popup.
*/
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');


overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));

var draw; // global so we can remove it later

var map = new ol.Map({
    layers: [
        new ol.layer.Image({
            source: new ol.source.ImageStatic({
                attributions: [
                    new ol.Attribution({
                        html: 'Protótipo'
                    })
                ],
                url: '/mapa-terreo.jpg',
                projection: projection,
                imageExtent: extent
            })
        }),
        vectorLayer
    ],
    overlays: [overlay],
    target: 'map',
    view: new ol.View({
        projection: projection,
        center: ol.extent.getCenter(extent),
        zoom: 2,
        maxZoom: 8
    })
});




select.on('select', function(e){
    var selected = e.selected;
    var deselected = e.deselected;
    overlay.setPosition(undefined);
    if (selected.length) {
        deselected.forEach(function(feature){
            var texto = feature.getStyle().getText().getText();
            feature.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',
                    text: texto,
                    textBaseline: 'middle',
                    textAlign: 'center',
                    fill: new ol.style.Fill({
                        color: '#000'
                    }),
                    stroke: new ol.style.Stroke({
                        color: [150, 153, 150, 1],
                        width: 3
                    })
                })
            }));
        });


        selected.forEach(function(feature){

            var texto = feature.getStyle().getText().getText();
            console.log(texto);
            feature.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: [0, 153, 255, 1],
                    width: 3
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',
                    text: texto,
                    textBaseline: 'middle',
                    textAlign: 'center',
                    fill: new ol.style.Fill({
                        color: '#000'
                    }),
                    stroke: new ol.style.Stroke({
                        color: [150, 153, 150, 1],
                        width: 3
                    })
                })
            }));
            if(emEdicao==false) {

                var aa = feature.getGeometry().getExtent();
                var coordinate = ol.extent.getCenter(aa);
                //console.log("O objeto de geometria "+feature.getGeometry().getType()+" tem o centro:  "+coordinate);
                content.innerHTML = '  <div class="fixed-action-btn click-to-toggle" style="position:relative; margin:0px;right:0px;bottom:0px;">'+
                '  <a class="btn-floating btn-large red" style="display:none;">' +
                '  <i class="large mdi-navigation-menu"></i>' +
                '  </a>' +
                '  <ul">' +
                '  <li><a href="javascript:editFeature();" class="btn-floating blue"><i class="material-icons">mode_edit</i></a></li>' +
                '  </ul>  </div>';
                overlay.setPosition(coordinate);
                $('.fixed-action-btn').openFAB();
            }
        });

    } else {

        overlay.setPosition(undefined);


        deselected.forEach(function(feature){
            var texto = feature.getStyle().getText().getText();
            feature.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',
                    text: texto,
                    textBaseline: 'middle',
                    textAlign: 'center',
                    fill: new ol.style.Fill({
                        color: '#000'
                    }),
                    stroke: new ol.style.Stroke({
                        color: [150, 153, 150, 1],
                        width: 3
                    })
                })
            }));
        });
    }
});


//map.addLayer(vectorLayer);

/**
* Add a click handler to the map to render the popup.
*/
map.on('singleclick', function(evt) {

});



function addInteraction(typeToDraw) {
    var value = typeToDraw;
    if (value !== 'None') {
        var geometryFunction, maxPoints;
        if (value === 'Square') {
            value = 'Circle';
            geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
        } else if (value === 'Box') {
            value = 'LineString';
            maxPoints = 2;
            geometryFunction = function(coordinates, geometry) {
                if (!geometry) {
                    geometry = new ol.geom.Polygon(null);
                }
                var start = coordinates[0];
                var end = coordinates[1];
                geometry.setCoordinates([
                    [start, [start[0], end[1]], end, [end[0], start[1]], start]
                ]);
                return geometry;
            };
        }
        draw = new ol.interaction.Draw({
            source: vectorSourceTmp,
            //features: features,
            type: /** @type {ol.geom.GeometryType} */ (value),
            geometryFunction: geometryFunction,
            maxPoints: maxPoints
        });
        console.log(draw.coordinates);
        map.addInteraction(draw);


        draw.on('drawend', function (evt) {
            //var coords = evt.feature.getGeometry().getCoordinates();
            //alert("As coordenadas do "+evt.feature.getGeometry().getType()+ " são: "+coords);

            featureInserida = evt.feature;
            Materialize.modalize.display( options={template:"InsertPlacemark",fixedFooter:true,bottomSheet:true} );
            /*

            */
            $("#panelEmEdicao").css("display", "none");
            $("#buttonsEdicao").css("display", "none");
            map.removeInteraction(draw);
            map.addInteraction(select);
            emEdicao = false;
            map.removeInteraction(modify);
            overlay.setPosition(undefined);
        });

    }
}


map.addInteraction(select);






insertPolygon.onclick = function() {
    map.removeInteraction(draw);
    map.removeInteraction(select);

    map.removeInteraction(modify);
    addInteraction("Polygon");
};

insertPolyline.onclick = function() {
    map.removeInteraction(draw);
    map.removeInteraction(select);
    map.removeInteraction(modify);
    addInteraction("LineString");
};



//Mostrar cursor quando estiver sob uma feature
map.on('pointermove', function(evt) {
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
});

cancelarEdicao = function () {
    featureaEmEdicao = select.getFeatures().getArray()[0];
    featureaEmEdicao.getGeometry().setCoordinates(coordenadasFeatureEmModificacao);


    var texto = featureaEmEdicao.getStyle().getText().getText();
    featureaEmEdicao.setStyle(new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.5)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            text: texto,
            textBaseline: 'middle',
            textAlign: 'center',
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: [150, 153, 150, 1],
                width: 3
            })
        })
    }));

    $("#panelEmEdicao").css("display", "none");
    $("#buttonsEdicao").css("display", "none");
    overlay.setPosition(undefined);
    map.removeInteraction(draw);
    map.addInteraction(select);
    emEdicao = false;
    map.removeInteraction(modify);

}

editFeature = function () {
    featureaEmEdicao = select.getFeatures().getArray()[0];
    coordenadasFeatureEmModificacao = featureaEmEdicao.getGeometry().getCoordinates();

    var texto = featureaEmEdicao.getStyle().getText().getText();
    emEdicao = true;
    map.addInteraction(modify);
    map.removeInteraction(select);

    overlay.setPosition(undefined);


    $("#panelEmEdicao").css("display", "inherit");
    $("#buttonsEdicao").css("display", "inherit");
    $("#buttonsEdicao").css("bottom", 90);
    featureaEmEdicao.setStyle(new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.5)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ff1111',
            width: 2
        }),
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            text: texto,
            textBaseline: 'middle',
            textAlign: 'center',
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: [150, 153, 150, 1],
                width: 3
            })
        })
    }));
    // do something
}


salvarEdicao = function () {
    featureaEmEdicao = select.getFeatures().getArray()[0];
    var texto = featureaEmEdicao.getStyle().getText().getText();
    featureaEmEdicao.setStyle(new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.5)'
        }),
        stroke: new ol.style.Stroke({
            color: [0, 153, 255, 1],
            width: 2
        }),
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            text: texto,
            textBaseline: 'middle',
            textAlign: 'center',
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: [150, 153, 150, 1],
                width: 3
            })
        })
    }));
    var coords = featureaEmEdicao.getGeometry().getCoordinates();

    var idPlacemark = featureaEmEdicao.getId();
    console.log("feature id is", idPlacemark + " with coordenates "+coords);
    Meteor.call( "updatePlacemark", idPlacemark,JSON.stringify(coords), function( error, response ) {
        if ( error ) {
            Bert.alert( error.reason, "danger" );
        } else {
            coordenadasFeatureEmModificacao = coords;
            Bert.alert( "Placemark atualizado com sucesso! ID: "+response, "success" );
        }
    });
    $("#panelEmEdicao").css("display", "none");
    $("#buttonsEdicao").css("display", "none");
    map.removeInteraction(draw);
    map.addInteraction(select);
    emEdicao = false;
    map.removeInteraction(modify);
    overlay.setPosition(undefined);
}



});




Template.InsertPlacemark.onRendered( function() {

    $('#selectFolder').material_select();
    /*
    $('#campo_aluguel').formatter({
    'pattern': 'RS{{999}}.{{999}},{{99}}',
    'persistent': true
});

$('#campo_area').formatter({
'pattern': '{{999}},{{99}}',
'persistent': true
});
*/
});

Template.InsertPlacemark.events({
    'click #salvarPlacemark': function(evt){

        var folder = $( "#selectFolder" ).val();
        var nome = $( "#nome_placemark" ).val();
        var aluguel = $( "#campo_aluguel" ).val();
        var area = $( "#campo_area" ).val();

        var coords = featureInserida.getGeometry().getCoordinates();


        Meteor.call( "insertPlacemark", nome,featureInserida.getGeometry().getType(),JSON.stringify(coords),folder,aluguel,area, function( error, response ) {
            if ( error ) {
                Bert.alert( error.reason, "danger" );
            } else {
                Bert.alert( "Placemark inserido com sucesso! ID: "+response, "success" );
            }
        });


        $('#modalizeModal').closeModal();
    },
    'click #cancelarInsercao': function(){
        $('#modalizeModal').closeModal();
    }

});
