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
           <ColorMapEntry color="#ffff80" quantity="5" opacity=".7"/>
           <ColorMapEntry color="#fcdd5d" quantity="25" opacity=".7"/>
           <ColorMapEntry color="#f7ba3e" quantity="50" opacity=".7"/>
           <ColorMapEntry color="#d68522" quantity="100" opacity=".7"/>
           <ColorMapEntry color="#6b0601" quantity="250" opacity=".7"/>
           <ColorMapEntry color="#6b0601" quantity="17999" opacity=".7"/>
         </ColorMap>
       </RasterSymbolizer>
      </Rule>
     </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>