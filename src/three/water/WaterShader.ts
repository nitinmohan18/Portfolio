// GLSL Water Shader
export const waterVertexShader = `
uniform float uTime;
uniform float uWaveHeight;
uniform float uWaveFrequency;
varying vec2 vUv;
varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float wave1 = sin(modelPosition.x * uWaveFrequency + uTime * 0.8) *
                sin(modelPosition.z * uWaveFrequency * 0.6 + uTime * 0.5) * uWaveHeight;
  float wave2 = sin(modelPosition.x * uWaveFrequency * 1.8 + uTime * 1.2) *
                sin(modelPosition.z * uWaveFrequency * 1.4 - uTime * 0.7) * uWaveHeight * 0.5;
  float wave3 = sin(modelPosition.x * uWaveFrequency * 0.5 - uTime * 0.3) *
                sin(modelPosition.z * uWaveFrequency * 0.8 + uTime * 1.1) * uWaveHeight * 0.3;

  float elevation = wave1 + wave2 + wave3;
  modelPosition.y += elevation;
  vElevation = elevation;
  vPosition = modelPosition.xyz;

  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
`;

export const waterFragmentShader = `
uniform float uTime;
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
varying vec2 vUv;
varying float vElevation;
varying vec3 vPosition;

void main() {
  float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
  mixStrength = clamp(mixStrength, 0.0, 1.0);
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

  // Fresnel-like edge highlight
  float fresnel = pow(1.0 - abs(vElevation * 10.0), 3.0);
  color += vec3(0.1, 0.15, 0.3) * fresnel * 0.5;

  // Subtle shimmer
  float shimmer = sin(vPosition.x * 5.0 + uTime * 2.0) * sin(vPosition.z * 5.0 - uTime * 1.5) * 0.03;
  color += shimmer;

  gl_FragColor = vec4(color, 0.82);
}
`;
