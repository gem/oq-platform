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
           <ColorMapEntry color="#f5f8f5" quantity="10" opacity=".7"/>
           <ColorMapEntry color="#e8f0e8" quantity="25" opacity=".7"/>
           <ColorMapEntry color="#d8e5d7" quantity="50" opacity=".7"/>
           <ColorMapEntry color="#c7d9c5" quantity="100" opacity=".7"/>
           <ColorMapEntry color="#b4ccb1" quantity="250" opacity=".7"/>
           <ColorMapEntry color="#9fbf9c" quantity="500" opacity=".7"/>
           <ColorMapEntry color="#a0bf9c" quantity="750" opacity=".7"/>
           <ColorMapEntry color="#8bb187" quantity="1000" opacity=".7"/>
           <ColorMapEntry color="#76a372" quantity="2500" opacity=".7"/>
           <ColorMapEntry color="#62965d" quantity="5000" opacity=".7"/>
           <ColorMapEntry color="#4d8847" quantity="7500" opacity=".7"/>
           <ColorMapEntry color="#397a32" quantity="10000" opacity=".7"/>
           <ColorMapEntry color="#095a01" quantity="17052" opacity=".7"/>
         </ColorMap>
       </RasterSymbolizer>
      </Rule>
     </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>