import { Injectable } from '@angular/core';
import * as d3 from './d3.bundle';

export type D3 = typeof d3;

@Injectable()
export class D3Service {

  constructor() { }

  public getD3(): D3 {
    return d3;
  }

}

export {
  // d3-array
  Bin,
  Bisector,
  HistogramGenerator,
  Numeric,
  Primitive,
  ThresholdArrayGenerator,
  ThresholdCountGenerator,
  // d3-axis
  Axis,
  AxisContainerElement,
  AxisScale,
  AxisTimeInterval,
  // d3-brush
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  // d3-chord
  ChordSubgroup,
  Chord,
  ChordGroup,
  ChordLayout,
  Chords,
  Ribbon,
  RibbonGenerator,
  RibbonSubgroup,
  // d3-collection
  Map,
  Nest,
  NestedArray,
  NestedMap,
  NestedObject,
  Set,
  Stringifiable,
  // d3-color
  Color,
  ColorCommonInstance,
  ColorFactory,
  ColorSpaceObject,
  CubehelixColor,
  CubehelixColorFactory,
  HCLColor,
  HCLColorFactory,
  HSLColor,
  HSLColorFactory,
  LabColor,
  LabColorFactory,
  RGBColor,
  RGBColorFactory,
  // d3-dispatch
  Dispatch,
  // d3-drag
  D3DragEvent,
  DragBehavior,
  DragContainerElement,
  DraggedElementBaseType,
  SubjectPosition,
  // d3-dsv
  DSV,
  DSVParsedArray,
  DSVRowAny,
  DSVRowString,
  // d3-ease
  BackEasingFactory,
  ElasticEasingFactory,
  PolynomialEasingFactory,
  // d3-force
  Force,
  ForceCenter,
  ForceCollide,
  ForceLink,
  ForceManyBody,
  ForceX,
  ForceY,
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
  // d3-format
  FormatLocaleDefinition,
  FormatLocaleObject,
  FormatSpecifier,
  // d3-geo
  ExtendedFeature,
  ExtendedFeatureCollection,
  ExtendedGeometryCollection,
  GeoCircleGenerator,
  GeoConicProjection,
  GeoContext,
  GeoGeometryObjects,
  GeoGraticuleGenerator,
  GeoIdentityTranform,
  GeoPath,
  GeoPermissibleObjects,
  GeoProjection,
  GeoRawProjection,
  GeoRotation,
  GeoSphere,
  GeoStream,
  GeoStreamWrapper,
  GeoTransformPrototype,
  // d3-hierarchy
  ClusterLayout,
  HierarchyCircularLink,
  HierarchyCircularNode,
  HierarchyLink,
  HierarchyNode,
  HierarchyPointLink,
  HierarchyPointNode,
  HierarchyRectangularLink,
  HierarchyRectangularNode,
  PackCircle,
  PackLayout,
  PartitionLayout,
  RatioSquarifyTilingFactory,
  StratifyOperator,
  TreeLayout,
  TreemapLayout,
  // d3-interpolate
  ColorGammaInterpolationFactory,
  ZoomInterpolator,
  ZoomView,
  // d3-path
  Path,
  // d3-polygon
  // No interfaces or types
  // d3-quadtree
  Quadtree,
  QuadtreeInternalNode,
  QuadtreeLeaf,
  // d3-queue
  Queue,
  // d3-random
  RandomBates,
  RandomExponential,
  RandomIrwinHall,
  RandomLogNormal,
  RandomNormal,
  RandomNumberGenerationSource,
  RandomUniform,
  // d3-scale
  InterpolatorFactory,
  ScaleContinuousNumeric,
  ScaleBand,
  ScaleIdentity,
  ScaleLinear,
  ScaleLogarithmic,
  ScaleOrdinal,
  ScalePoint,
  ScalePower,
  ScaleQuantile,
  ScaleQuantize,
  ScaleSequential,
  ScaleThreshold,
  ScaleTime,
  // d3-selection
  ArrayLike,
  BaseEvent,
  BaseType,
  ContainerElement,
  CustomEventParameters,
  EnterElement,
  Local,
  NamespaceLocalObject,
  NamespaceMap,
  Selection,
  SelectionFn,
  TransitionLike,
  ValueFn,
  // d3-selection-multi
  ValueMap,
  // d3-shape
  Arc,
  Area,
  AreaRadial,
  CurveBundleFactory,
  CurveCardinalFactory,
  CurveCatmullRomFactory,
  CurveFactory,
  CurveFactoryLineOnly,
  CurveGenerator,
  CurveGeneratorLineOnly,
  DefaultArcObject,
  DefaultLinkObject,
  Line,
  LineRadial,
  Link,
  LinkRadial,
  Pie,
  PieArcDatum,
  RadialArea,
  RadialLine,
  RadialLink,
  Series,
  SeriesPoint,
  Stack,
  Symbol,
  SymbolType,
  // d3-time
  CountableTimeInterval,
  TimeInterval,
  // d3-time-format
  TimeLocaleDefinition,
  TimeLocaleObject,
  // d3-timer
  Timer,
  // d3-transition
  Transition,
  // d3-voronoi
  VoronoiCell,
  VoronoiDiagram,
  VoronoiEdge,
  VoronoiLayout,
  VoronoiLink,
  VoronoiPoint,
  VoronoiPointPair,
  VoronoiPolygon,
  VoronoiSite,
  VoronoiTriangle,
  // d3-zoom
  D3ZoomEvent,
  ZoomBehavior,
  ZoomedElementBaseType,
  ZoomScale,
  ZoomTransform
} from './d3.bundle';