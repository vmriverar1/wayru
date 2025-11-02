

  Opción 2: "The Progressive Reveal" (Más elegante)

  Concepto: Cards que crecen al centro conforme scrolleas

  Flujo:
  1. Intro: "Sé Parte del Cambio" centrado + texto abajo
  2. Scroll → intro se hace pequeño y se mueve arriba/izquierda
  3. Cards en fila horizontal (70% width cada una)
  4. La card del centro se agranda (scale 1.1) y tiene más brillo
  5. Las de los lados están ligeramente desenfocadas (blur)
  6. Puedes navegar con scroll o arrastrando

  Ventajas:
  - Balance entre elegancia y dinamismo
  - El foco visual está claro
  - Menos abrumador que pantalla completa

  Opción 3: "The Split Screen Story" (Más único)

  Concepto: Pantalla dividida que evoluciona

  Flujo:
  1. Inicio: "Sé Parte del Cambio" + intro (izquierda 50%)
  2. Primera card mini (derecha 50%)
  3. Al scrollear:
     - El texto intro se hace sticky-small (esquina sup. izq)
     - La card crece de 50% → 70% → 100% del ancho
     - Siguiente card entra empujando la anterior
  4. Efecto "empujar": como Instagram stories horizontales

  Ventajas:
  - Transición natural del texto a las cards
  - Mantiene contexto del título siempre visible
  - Sensación de progresión narrativa

  Opción 4: "The Carousel Cinema" (Mi recomendación)

  Concepto: Scroll horizontal con perspectiva 3D

  Flujo:
  1. Hero: "Sé Parte del Cambio" en grande (ocupa 60vh)
     - Texto intro como subtítulo estilo película
     - "Scroll para descubrir →" hint sutil
  2. Scroll horizontal comienza:
     - Hero se encoge y se fija arriba (pequeño, 10vh)
     - Cards entran en fila con perspectiva 3D
     - Card activa: scale 1.0, z-index alto, sin rotación
     - Cards laterales: scale 0.85, rotateY(15deg), opacity 0.6
  3. Cada card tiene:
     - Imagen de fondo (pantalla completa con overlay)
     - Contenido centrado en card flotante (max-w-lg)
     - CTA grande y visible
  4. Scroll suave con snap points (cada card se "ancla")
