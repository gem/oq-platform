<?xml version="1.0" encoding="UTF-8"?>
<sld:UserStyle xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
  <sld:Name>Hazard Map</sld:Name>
  <sld:Title/>
  <sld:FeatureTypeStyle>
    <sld:Name>Hazard Map</sld:Name>
    <sld:Title>Hazard Map Style</sld:Title>
    <sld:FeatureTypeName>Feature</sld:FeatureTypeName>
    <sld:Rule>
      <sld:Name>AS: 1/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>0.00 - 0.01</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>0.001</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>0.01</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#A50026</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>AS: 2/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>0.01 - 0.05</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>0.01</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>0.05</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#D73027</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>AS: 3/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>0.05 - 0.10</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>0.05</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>0.1</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#F46D43</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>AS: 4/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>0.10 - 0.15</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>0.1</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>0.15000000000000002</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#FDAE61</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>AS: 5/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>0.15 - 0.20</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>0.15000000000000002</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>0.2</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#FEE090</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>AS: 6/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>0.20 - 0.30</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>0.2</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>0.30000000000000004</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#FFFFBF</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>AS: 7/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>0.30 - 0.50</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>0.30000000000000004</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>0.5</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#E0F3F8</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>AS: 8/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>0.50 - 0.75</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>0.5</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>0.75</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#ABD9E9</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>AS: 9/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>0.75 - 1.00</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>0.75</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>1.0</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#74ADD1</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>AS: 10/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>1.00 - 2.50</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>1.0</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>2.5</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#4575B4</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>AS: 11/11 GraduatedColorPointRuleList</sld:Name>
      <sld:Title>2.50 - 10.00</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:And>
            <ogc:Not>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                  <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsNull>
                    <ogc:PropertyName>iml</ogc:PropertyName>
                  </ogc:PropertyIsNull>
                  <ogc:PropertyIsEqualTo>
                    <ogc:Literal>NEVER</ogc:Literal>
                    <ogc:Literal>TRUE</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Or>
              </ogc:And>
            </ogc:Not>
            <ogc:PropertyIsBetween>
              <ogc:PropertyName>iml</ogc:PropertyName>
              <ogc:LowerBoundary>
                <ogc:Literal>2.5</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>10.0</ogc:Literal>
              </ogc:UpperBoundary>
            </ogc:PropertyIsBetween>
          </ogc:And>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#313695</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#999999</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
    <sld:Rule>
      <sld:Name>NODATA_RULE</sld:Name>
      <sld:Title>No data</sld:Title>
      <ogc:Filter>
        <ogc:And>
          <ogc:PropertyIsEqualTo>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
            <ogc:Literal>ALL_LABEL_CLASSES_ENABLED</ogc:Literal>
          </ogc:PropertyIsEqualTo>
          <ogc:Or>
            <ogc:PropertyIsNull>
              <ogc:PropertyName>iml</ogc:PropertyName>
            </ogc:PropertyIsNull>
            <ogc:PropertyIsEqualTo>
              <ogc:Literal>NEVER</ogc:Literal>
              <ogc:Literal>TRUE</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Or>
        </ogc:And>
      </ogc:Filter>
      <sld:MaxScaleDenominator>1.0E20</sld:MaxScaleDenominator>
      <sld:PointSymbolizer>
        <sld:Graphic>
          <sld:Mark>
            <sld:WellKnownName>circle</sld:WellKnownName>
            <sld:Fill>
              <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
            </sld:Fill>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
  </sld:FeatureTypeStyle>
</sld:UserStyle>
