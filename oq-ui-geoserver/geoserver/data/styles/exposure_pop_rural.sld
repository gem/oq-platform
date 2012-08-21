<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld
http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd" version="1.0.0">
  <NamedLayer>
    <Name>raster_layer</Name>
    <UserStyle>
      <Name>raster</Name>
      <Title>A boring default style</Title>
      <Abstract>A sample style for rasters</Abstract>
      <FeatureTypeStyle>
       <Rule>
       <RasterSymbolizer>
         <ColorMap>
           <ColorMapEntry color="#FFFFFF" quantity="0" opacity="0"/>
           <ColorMapEntry color="#f1eacf" quantity="10" opacity=".5"/>
           <ColorMapEntry color="#e3d39c" quantity="50" opacity=".5"/>
           <ColorMapEntry color="#d5bd6c" quantity="100" opacity=".7"/>
           <ColorMapEntry color="#cdb252" quantity="500" opacity=".7"/>
           <ColorMapEntry color="#bf9b1f" quantity="1000" opacity=".7"/>
           <ColorMapEntry color="#b68e01" quantity="5000" opacity=".7"/>
         </ColorMap>
       </RasterSymbolizer>
      </Rule>
     </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>