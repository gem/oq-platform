<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>exposure_pop_urban</sld:Name>
    <sld:UserStyle>
      <sld:Name>exposure_pop_urban</sld:Name>
      <sld:Title>A boring default style</sld:Title>
      <sld:IsDefault>1</sld:IsDefault>
      <sld:Abstract>A sample style for rasters</sld:Abstract>
      <sld:FeatureTypeStyle>
        <sld:Name>name</sld:Name>
        <sld:Rule>
          <sld:RasterSymbolizer>
            <sld:Geometry>
              <ogc:PropertyName>geom</ogc:PropertyName>
            </sld:Geometry>
            <sld:ColorMap>
              <sld:ColorMapEntry color="#FFFFFF" opacity="0" quantity="0"/>
              <sld:ColorMapEntry color="#ddd0d0" opacity="0.7" quantity="10"/>
              <sld:ColorMapEntry color="#c3acab" opacity="0.7" quantity="50"/>
              <sld:ColorMapEntry color="#a68483" opacity="0.7" quantity="100"/>
              <sld:ColorMapEntry color="#895c5b" opacity="0.7" quantity="500"/>
              <sld:ColorMapEntry color="#6e3635" opacity="0.7" quantity="1000"/>
              <sld:ColorMapEntry color="#581816" opacity="0.7" quantity="5000"/>
              <sld:ColorMapEntry color="#480201" opacity="0.7" quantity="7500"/>
            </sld:ColorMap>
          </sld:RasterSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>