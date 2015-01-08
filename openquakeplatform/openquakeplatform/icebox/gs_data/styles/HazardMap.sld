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
              <sld:CssParameter name="fill">#053061</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
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
              <sld:CssParameter name="fill">#2166AC</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
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
      <sld:Title>0.05 - 0.08</sld:Title>
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
                <ogc:Literal>0.07500000000000001</ogc:Literal>
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
              <sld:CssParameter name="fill">#4393C3</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
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
      <sld:Title>0.08 - 0.09</sld:Title>
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
                <ogc:Literal>0.07500000000000001</ogc:Literal>
              </ogc:LowerBoundary>
              <ogc:UpperBoundary>
                <ogc:Literal>0.08750000000000001</ogc:Literal>
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
              <sld:CssParameter name="fill">#92C5DE</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
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
      <sld:Title>0.09 - 0.10</sld:Title>
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
                <ogc:Literal>0.08750000000000001</ogc:Literal>
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
              <sld:CssParameter name="fill">#D1E5F0</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
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
      <sld:Title>0.10 - 0.30</sld:Title>
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
              <sld:CssParameter name="fill">#F7F7F7</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
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
              <sld:CssParameter name="fill">#FDDBC7</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
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
              <sld:CssParameter name="fill">#F4A582</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
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
              <sld:CssParameter name="fill">#D6604D</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
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
              <sld:CssParameter name="fill">#B2182B</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
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
              <sld:CssParameter name="fill">#67001F</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#CCCCCC</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.10000000149011612</sld:CssParameter>
            </sld:Stroke>
          </sld:Mark>
          <sld:Size>
            <ogc:Literal>8.0</ogc:Literal>
          </sld:Size>
        </sld:Graphic>
      </sld:PointSymbolizer>
    </sld:Rule>
  </sld:FeatureTypeStyle>
</sld:UserStyle>
