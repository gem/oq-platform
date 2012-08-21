<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld
http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd" version="1.0.0">
  <NamedLayer>
    <Name>exposure_pop_urban</Name>
    <UserStyle>
      <Name>exposure_pop_urban</Name>
      <Title>pop valuse urban</Title>
      <Abstract>for use with ged geotiff pop valuse data</Abstract>
      <FeatureTypeStyle>
       <Rule>
       <RasterSymbolizer>
         <ColorMap>
           <ColorMapEntry color="#FFFFFF" quantity="0" opacity="0"/>
           <ColorMapEntry color="#e8e8f9" quantity="10" />
           <ColorMapEntry color="#c5c7ef" quantity="100" />
           <ColorMapEntry color="#888cde" quantity="1000" />
           <ColorMapEntry color="#494fcd" quantity="10000" />
           <ColorMapEntry color="#242cc2" quantity="100000" />
           <ColorMapEntry color="#0911bb" quantity="149000" />
         </ColorMap>
       </RasterSymbolizer>
      </Rule>
     </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>