# Aprendizaje Automático

[Abrir apunte](index.html)

<a id="fundamentos"></a>

## 01. Fundamentos y vocabulario

### Jerarquía

- **Inteligencia Artificial (IA):** campo que construye sistemas capaces de realizar tareas asociadas con inteligencia. Incluye aprendizaje, reglas, búsqueda y planificación.
- **Machine Learning (ML), o aprendizaje automático:** subcampo de la IA que ajusta modelos a partir de datos para aplicar patrones aprendidos sobre casos nuevos.
- **Deep Learning (DL):** área de ML desarrollada en [Redes neuronales y Deep Learning](#redes).

### Objetos básicos

| Concepto | Definición |
| --- | --- |
| Dataset | Conjunto de observaciones. Habitualmente cada fila representa una observación y cada columna una variable. |
| Feature o característica | Variable de entrada utilizada para aprender o inferir. |
| Target | Resultado conocido que se intenta predecir en aprendizaje supervisado. |
| Algoritmo | Procedimiento de aprendizaje que busca relaciones o estructura en los datos. |
| Parámetros | Valores internos aprendidos durante el entrenamiento. |
| Entrenamiento | Ajuste del algoritmo con datos históricos. |
| Modelo | Resultado entrenado, con los parámetros ya ajustados. |
| Inferencia | Aplicación del modelo sobre datos nuevos para producir una salida. |

### Alcance y límites

- **Función:** ML mira datos pasados, abstrae regularidades y las aplica a casos nuevos para clasificar, predecir, agrupar, recomendar o detectar anomalías.
- **Condición:** funciona mejor en tareas tipificadas, con procedimiento conocido y variabilidad representada en los datos.
- **Dominio:** extrapola dentro de lo aprendido. No transfiere conocimiento entre dominios con la flexibilidad de una persona.
- **Mecanismo:** es estadístico o probabilístico. La fluidez de una salida no permite inferir comprensión, consciencia ni veracidad.
- **Uso:** la combinación útil es IA más inteligencia natural, velocidad y repetición de la máquina, criterio y conocimiento del dominio de la persona.

El software tradicional suele producir datos durante su operación. ML es primero un gran ingestor: consume historia para entrenar y luego genera una salida comparativamente pequeña, como una clase, una probabilidad o un número.

<a id="ciclo"></a>

## 02. Ciclo de vida, roles y trazabilidad

### Secuencia completa

**Hilo para memorizar:** definir el problema, conseguir los datos, entenderlos, decidir si continuar, prepararlos, entrenar, evaluar, llevar a producción, vigilar y retirar.

1. **Definición del problema:** precisar la decisión, el target, el horizonte y el criterio de éxito. Esto determina qué datos y qué salida necesita el proyecto.
2. **Acceso a los datos:** localizar fuentes, revisar antecedentes y obtener acceso efectivo. Sin datos disponibles no puede comprobarse la viabilidad.
3. **Diagnóstico de los datos:** integrar copias de las fuentes y usar [Data Wrangling y análisis exploratorio de datos (EDA, *Exploratory Data Analysis*)](#datos) para conocer estructura, calidad, distribución y anomalías.
4. **Decisión de viabilidad:** con el diagnóstico, tomar una decisión Go, continuar, o No Go, detener o reformular.
5. **Preparación de los datos:** realizar [limpieza e ingeniería de características](#features) hasta obtener el dataset que recibirá el modelo.
6. **Entrenamiento del modelo:** separar los datos, fijar una referencia simple, seleccionar una [familia](#familias), entrenar, validar y ajustar.
7. **Evaluación del modelo:** aplicar las [métricas](#metricas) definidas, explicar resultados, probar sesgos y validar con especialistas.
8. **Puesta en producción:** resolver interfaz, seguridad, costo y tiempo de respuesta, luego desplegar y versionar mediante [Machine Learning Operations (MLOps)](#mlops).
9. **Monitoreo y mantenimiento:** observar servicio, datos, predicciones y desempeño; ante un cambio, diagnosticar antes de corregir, reentrenar o revertir.
10. **Retiro del sistema:** desactivarlo junto con sus dependencias de forma controlada y documentar lo aprendido.

**Go:** el problema merece ML, los datos son accesibles y representativos, existen recursos, hay una métrica acordada y los riesgos son manejables. **No Go:** convienen reglas, faltan datos críticos, la calidad o el acceso son insuficientes, el costo es inviable o el riesgo supera el valor.

### Propiedades del ciclo

- **Iterativo:** un hallazgo puede obligar a volver a cualquier etapa anterior.
- **Incierto:** el dataset termina de entenderse cuando el modelo ya funciona y aparecen comportamientos no visibles al comienzo.
- **Controlado:** cada etapa necesita entregable, versión, criterio de aceptación y posibilidad de Go o No Go.
- **Trazable:** extracción, transformación, experimento, métrica, decisión y resultado deben quedar en una bitácora.
- **Acumulativo:** la bitácora alimenta una base de conocimiento. La experiencia externa debe adaptarse a los sistemas, procesos y criterios propios de cada organización.

### Roles

| Rol | Responsabilidad | Entregable |
| --- | --- | --- |
| Owner o experto de negocio | Problema, criterio de éxito y validación empírica. | Criterio aceptado y contraste de resultados. |
| Ingeniero de datos | Acceso, Data Wrangling, calidad, limpieza y primera construcción de features. | Dataset trazable e informe de calidad. |
| Científico de datos | Familias, entrenamiento, métricas, explicaciones y pruebas de sesgo. | Modelo validado y documento de interpretación. |
| Ingeniería de producción | Integración, seguridad, latencia, despliegue, monitoreo y retiro. | Servicio reproducible y observable. |

El conocimiento del dominio es obligatorio para formular features, interpretar anomalías y validar explicaciones. La figura del científico de datos itinerante pierde eficacia cuando cada industria exige criterios específicos.

<a id="problema"></a>

## 03. Definición del problema y viabilidad

### Dos preguntas distintas

- **Pertinencia:** ¿el problema requiere ML o alcanza una regla, consulta o automatización convencional?
- **Capacidad:** ¿la organización puede resolverlo con sus datos, acceso, tiempo, recursos, seguridad y conocimiento?

### Definición mínima

1. **Decisión:** describir el proceso, qué se quiere mejorar y quién usará la salida.
2. **Predicción:** definir unidad de análisis, target y horizonte temporal.
3. **Antecedentes:** revisar algoritmos, datasets y resultados de problemas equivalentes para saber qué ya se intentó.
4. **Éxito:** fijar métrica, valor mínimo aceptable y costo de error antes de entrenar.
5. **Datos:** confirmar su existencia y acceso efectivo.
6. **Recursos:** estimar cómputo, almacenamiento, latencia, seguridad, presupuesto y conocimiento del dominio.

**Criterio de éxito:** condición de negocio que vuelve útil al proyecto. **Métrica:** indicador numérico que permite medir esa condición. El criterio completo incluye valor mínimo, costo de errores, tiempo de respuesta, costo operativo y utilidad para quien decide. La métrica se fija antes de ver resultados para no favorecer al algoritmo que mejor luce en lugar del que resuelve el problema.

### Estimación

Se estima en dos tramos. El primero llega hasta el diagnóstico de datos. Con esa evidencia se reestiman limpieza, features, entrenamiento y producción. El estudio de viabilidad termina después del EDA y puede consumir entre 25% y 33% del esfuerzo total.

### Plantilla para resolver un caso de final

1. **Problema:** objetivo, target, horizonte y costo de error.
2. **Datos:** fuentes, acceso, granularidad, historial, etiquetas y restricciones.
3. **Diagnóstico:** calidad de los datos y decisión Go o No Go.
4. **Preparación:** limpieza, features y familia de aprendizaje.
5. **Entrenamiento:** separación temporal o por grupos, referencia simple o baseline, entrenamiento y ajuste.
6. **Evaluación:** métrica principal y métricas complementarias.
7. **Validación:** explicabilidad, sesgos y contraste con especialistas.
8. **Producción:** despliegue, latencia, monitoreo, reentrenamiento y retiro.

<a id="datos"></a>

## 04. Data Wrangling y análisis exploratorio

### Acceso y capacidad

Existencia y acceso son condiciones diferentes. Antes de usar datos deben resolverse permisos, anonimización, cumplimiento, acuerdos entre áreas, claves de unión e infraestructura. Solo entonces se conocen volumen, granularidad, formato, período y calidad.

La reserva inicial de almacenamiento es aproximadamente 2,25 veces el tamaño del dataset: una copia de trabajo más estados intermedios. Puede reducirse a 1,75 eliminando o archivando estados, a costa de no poder reprocesar inmediatamente desde cualquier paso.

### Data Wrangling

Es la preparación que convierte datos crudos y dispersos en un dataset utilizable. Comprende localización e integración de fuentes, revisión de formatos y calidad, limpieza y transformaciones. Puede abarcar EDA, limpieza e ingeniería de características según la metodología. Consume aproximadamente entre 45% y 80% del tiempo dedicado a los datos.

### EDA

EDA significa *Exploratory Data Analysis*, análisis exploratorio de datos. Diagnostica estructura, calidad, distribución y anomalías antes de modificar el original.

1. **Preservar:** crear una copia inmutable para poder volver al dato original.
2. **Inventariar:** revisar filas, columnas, esquema, tipos, claves, target, granularidad, períodos, memoria y valores únicos.
3. **Medir calidad:** cuantificar nulos, duplicados, inconsistencias, rangos imposibles y desbalance, también por segmentos.
4. **Describir comportamiento:** analizar distribuciones, percentiles, correlaciones, estacionalidad, cambios y valores fuera de norma.
5. **Investigar:** contrastar los hallazgos con consultas dirigidas y especialistas.
6. **Documentar:** registrar hipótesis, evidencia y preguntas abiertas.
7. **Decidir:** emitir el informe de calidad y la recomendación Go o No Go que habilita o detiene la preparación.

### Lecturas y criterios

- **Tipos:** deben ajustarse al significado y rango real. Reducir un tipo sobredimensionado ahorra memoria, pero exige revisar precisión, nulos y valores futuros.
- **Estadística descriptiva:** count mide presencia, mean y std resumen centro y dispersión, min y max muestran rango, y percentiles muestran concentración. Mínimo igual a máximo indica columna constante.
- **Nulos:** el porcentaje aceptable depende de la cantidad absoluta, el patrón de ausencia, la variable afectada, el sesgo posible y la recuperabilidad. Un 1% de millones puede ser tolerable y un 5% a 7% de pocos miles puede ser crítico.
- **Duplicados:** se decide con una clave y el proceso de negocio. Dos registros iguales pueden ser una repetición inválida o eventos legítimos.
- **Reversiones:** anulaciones, devoluciones y notas de crédito deben vincularse con la transacción original para no distorsionar estadísticas.
- **Outlier o anomalía:** observación fuera de norma cuyo origen debe investigarse. Puede corresponder a un dato válido, fraude, un evento excepcional, un cambio de régimen o un error.
- **Régimen especial:** un comportamiento correcto pero no representativo del funcionamiento habitual, Business as Usual, puede requerir segmento, features o modelo propios.
- **Serendipia:** un objetivo secundario descubierto durante el análisis debe registrarse como conocimiento, aunque no sea la pregunta inicial.

### Correlación

| Método | Captura | Uso |
| --- | --- | --- |
| Pearson | Relación lineal numérica. | Forma aproximadamente lineal y sin dominio de outliers. |
| Spearman | Relación monótona mediante rangos. | El orden se conserva aunque la forma no sea lineal. |
| Kendall Tau | Concordancia entre pares. | Muestras menores, empates o análisis robusto del orden. |

La correlación describe asociación dentro de un período y una población. La relación puede ser espuria, temporal o producida por una tercera variable; para inferir causalidad o eliminar features se necesita contexto adicional.

### Práctica y herramientas

- **Arqueología:** reconstruye el proceso que produjo cada hallazgo. La intuición formula hipótesis que luego se contrastan con evidencia.
- **Seguridad:** el análisis puede revelar fallas o manipulaciones que los controles en línea no detectaron.
- **Comunicación:** explicar problemas estructurales requiere evidencia, historia reconstruida y asertividad.
- **Experiencia:** se acumula en patrones generales, patrones de industria y particularidades de cada empresa, y se desarrolla practicando con datasets distintos.
- **Estándar:** *Open Subsurface Data Universe* (OSDU) es una referencia para organizar datos de petróleo y gas.
- **Inspección:** Pandas permite análisis detallado. DataPrep y AutoViz automatizan perfiles y gráficos, pero la interpretación sigue a cargo del equipo.
- **Persistencia:** el formato de valores separados por comas (CSV, *Comma-Separated Values*) guarda tablas como texto. Joblib guarda objetos binarios de Python y exige un entorno compatible.

<a id="features"></a>

## 05. Limpieza e ingeniería de características

### Limpieza

La limpieza corrige o trata problemas para alcanzar una calidad utilizable sin alterar silenciosamente el significado.

| Problema | Opciones | Control |
| --- | --- | --- |
| Faltantes | Recuperar fuente, eliminar, imputar, crear indicador o mantener como no aplicable. | Patrón de ausencia, cantidad, sesgo y efecto sobre distribución. |
| Duplicados | Eliminar, consolidar según clave o conservar. | Definición de evento y granularidad. |
| Categorías | Normalizar mayúsculas, espacios, códigos y equivalencias. | Reglas trazables validadas por negocio. |
| Rangos imposibles | Corregir, excluir o recuperar origen. | No asumir error antes de investigar. |

### Ingeniería de características

Transforma variables disponibles o crea nuevas para representar patrones en una forma que el algoritmo pueda utilizar.

- **Fechas:** descomponerlas en año, mes, día, hora, día de semana, estación o trimestre.
- **Categorías:** codificarlas según el modelo sin introducir un orden inexistente.
- **Normalización MinMax:** lleva valores a un rango, usualmente entre 0 y 1. Es sensible a extremos.
- **Reescalado:** lleva magnitudes a escalas comparables para evitar que una variable domine por su unidad.
- **Asimetría:** aplicar logaritmos a distribuciones muy sesgadas cuando el dominio lo permite.
- **Combinaciones:** crear ratios, acumulados, interacciones, ventanas temporales y variables de dominio.
- **Análisis de componentes principales (PCA, *Principal Component Analysis*):** combina variables correlacionadas en menos componentes. Reduce dimensión y costo, pero pierde interpretación directa.

### Fuentes y selección

- **Capa genérica:** fechas, escalado, codificación y tratamiento de correlaciones aplicables en múltiples dominios.
- **Capa de industria:** representaciones propias del sector y sus procesos.
- **Capa de empresa y experiencia:** sistemas, cultura de carga, reglas e hipótesis particulares.

La selección revisa variación, valores distintos, correlaciones, redundancias, interacciones, conocimiento del dominio e importancia obtenida con modelos, incluidos árboles de decisión. El valor de una feature depende de la información que aporta, no de aumentar la cantidad de columnas. Una referencia operativa es que tres features pueden explicar 70% del resultado, dos adicionales llevarlo a 85% y el resto aportar 15%. Si eliminar variables cambia una métrica de 0,82 a 0,81, puede convenir el modelo menor por costo, latencia y mantenimiento.

Una accuracy, proporción total de aciertos, persistentemente entre 0,40 y 0,55 sugiere que pueden faltar features que describan el patrón. También deben revisarse el target, la calidad, el algoritmo, la separación y la posibilidad predictiva.

Una feature se conserva si mejora desempeño, estabilidad o interpretabilidad sin producir **leakage**, filtración de información no disponible al momento real de inferencia. La preparación genérica corresponde principalmente al ingeniero de datos; el científico revisa transformaciones dependientes de la familia de modelos.

<a id="familias"></a>

## 06. Familias de aprendizaje y algoritmos

### Respuesta esperada de tres familias

| Familia | Target | Salida | Algoritmos frecuentes |
| --- | --- | --- | --- |
| Clasificación | Categoría conocida. | Clase o probabilidad. | Regresión logística, árboles, Random Forest, Naive Bayes, máquinas de vectores de soporte (SVM, *Support Vector Machine*), K vecinos más cercanos (KNN, *K-Nearest Neighbors*) y redes. |
| Regresión o predicción | Valor numérico conocido. | Valor continuo. | Regresión lineal, árboles, Random Forest, boosting (combinación secuencial de modelos) y redes. |
| Clustering o clusterización | No existe. | Grupos o estructura. | K Means y agrupamiento espacial basado en densidad con ruido (DBSCAN, *Density-Based Spatial Clustering of Applications with Noise*). |

Clasificación y regresión son supervisadas porque aprenden desde targets conocidos. Clustering es no supervisado. Otra taxonomía clasifica los paradigmas en supervisado, no supervisado y por refuerzo. En refuerzo, un agente aprende acciones mediante recompensas o penalizaciones.

### Por qué existen familias

No se conocen de antemano todos los patrones ni su distribución. Problemas con el mismo objetivo y columnas pueden tener historias, concentraciones y regímenes distintos. No existe un algoritmo universalmente mejor: primero se elige la familia por el tipo de salida y después se comparan algoritmos con la métrica del problema.

Con pocos datos o baja representatividad se prefieren modelos simples y [regularizados](#regularizacion). [Deep Learning](#redes) suele ser una peor primera opción por su demanda de datos. [EDA](#datos) y clustering permiten investigar la estructura antes de plantear una predicción supervisada.

### Propiedades mínimas de algoritmos

- **Regresión lineal:** relación lineal, rápida e interpretable.
- **Regresión logística:** clasificación probabilística pese a su nombre.
- **Árbol de decisión:** reglas interpretables, sensible al sobreajuste si es profundo.
- **Random Forest:** conjunto de árboles que votan o promedian, más estable y menos directamente explicable.
- **KNN:** decide por vecinos; requiere escalas comparables.
- **Naive Bayes y SVM:** frecuentes en clasificación y espacios con muchas variables.
- **K Means:** exige cantidad de grupos. **DBSCAN:** busca regiones densas y puede marcar ruido.
- **Redes neuronales:** alta capacidad y menor transparencia, desarrolladas en [Redes y Deep Learning](#redes).

Una persona con experiencia reduce candidatos plausibles. Una búsqueda sin criterio puede consumir recursos y quedar en un mínimo local, solución mejor que sus alternativas cercanas pero no la mejor disponible.

<a id="entrenamiento"></a>

## 07. Entrenamiento, hiperparámetros y validación

### Particiones

| Conjunto | Uso |
| --- | --- |
| Train | Ajustar los parámetros del modelo. |
| Validación | Comparar alternativas durante el desarrollo. |
| Test o holdout | Evaluación final e independiente. Si guía decisiones repetidas, deja de ser test. |

Una división frecuente reserva 80% de los datos para entrenamiento y 20% para evaluación. Esa proporción se modifica cuando la temporalidad, los grupos, el desbalance, el volumen o la dependencia entre observaciones exigen otra separación. En series temporales se preserva el orden para evitar que el futuro intervenga en la predicción del pasado.

### Hiperparámetros

Son configuraciones fijadas antes de entrenar, como profundidad, cantidad de árboles o tasa de aprendizaje. Afectan desempeño, costo y generalización.

- **Grid search:** lista fija de combinaciones.
- **Random search:** combinaciones aleatorias.
- **Optimización bayesiana:** usa resultados previos para elegir la próxima prueba.

El ajuste suele mejorar poco una métrica, pero también puede reducir costo o inestabilidad. Diez configuraciones por diez folds producen cien entrenamientos, por lo que necesita presupuesto y criterio.

### Validación cruzada

La validación cruzada permite detectar patrones desconocidos que quedaron concentrados en determinadas particiones, en lugar de asumir que todos se distribuyen uniformemente.

K-fold divide el train en K partes. Entrena K veces, usando una parte diferente para validar y las restantes para ajustar. Produce una distribución de resultados y reduce la dependencia de una única partición. Son habituales entre 3 y 10 folds.

- **Media, lectura operativa:** cuán bien discrimina los patrones encontrados.
- **Desviación estándar, lectura operativa:** si algún fold contiene patrones distintos. Dispersión alta exige investigar segmentos, períodos, anomalías o cambios de régimen.
- **Alcance:** una dispersión baja demuestra estabilidad entre los folds observados. No permite afirmar que la muestra contiene todos los patrones posibles.

Los patrones pueden concentrarse por tiempo, región, cliente, paciente o equipo. Las particiones deben evitar que observaciones relacionadas aparezcan a ambos lados y deben representar el uso real.

<a id="metricas"></a>

## 08. Métricas y costos de error

### Clasificación

La notación usa verdadero positivo (TP), verdadero negativo (TN), falso positivo (FP) y falso negativo (FN).

| Métrica | Fórmula | Uso |
| --- | --- | --- |
| Accuracy | (TP + TN) / Total | Aciertos totales. Engañosa con clases desbalanceadas. |
| Precision | TP / (TP + FP) | Importa cuando el falso positivo es costoso. |
| Recall o sensibilidad | TP / (TP + FN) | Importa cuando omitir un positivo es grave. |
| F1 | 2 x P x R / (P + R) | Media armónica de precision y recall. |
| ROC AUC (*Receiver Operating Characteristic, Area Under the Curve*) | Área bajo la curva ROC | Ordenamiento de positivos frente a negativos al variar el umbral. |
| PR AUC (*Precision Recall, Area Under the Curve*) | Área bajo precision y recall | Más informativa con pocos positivos. |

TP y TN son aciertos positivos y negativos. FP marca positivo algo negativo. FN omite un positivo real. La matriz de confusión contiene esos cuatro valores.

Con clases desbalanceadas, predecir siempre la clase mayoritaria puede producir accuracy alta y recall nulo para la minoritaria.

### Regresión

- **Error absoluto medio (MAE, *Mean Absolute Error*):** promedio del error absoluto, en la unidad del target.
- **Raíz del error cuadrático medio (RMSE, *Root Mean Squared Error*):** penaliza errores grandes.
- **R cuadrado:** variabilidad explicada respecto de predecir el promedio. Puede ser negativa en datos nuevos.
- **Error porcentual absoluto medio (MAPE, *Mean Absolute Percentage Error*):** inestable con valores reales cero o pequeños.

### Selección

1. **Evento:** definir la clase positiva y quién usará la decisión.
2. **Errores:** asignar consecuencias a los falsos positivos y falsos negativos.
3. **Distribución:** revisar si una clase domina ampliamente a la otra.
4. **Medición:** elegir métrica principal, métricas complementarias y umbral de decisión.
5. **Negocio:** traducir el resultado a costo o valor. Esa traducción determina si el modelo sirve.

La métrica puede cambiar el algoritmo ganador. En la comparación de referencia, un modelo tuvo recall 85% y accuracy 40%, mientras Gradient Boosting, que combina árboles de forma secuencial, tuvo accuracy 81% y recall 35%. Si se priorizan falsos negativos gana el primero; si se mira solo accuracy gana el segundo.

<a id="redes"></a>

## 09. Redes neuronales y Deep Learning

Una red neuronal conecta unidades en una capa de entrada, capas ocultas y una capa de salida. Cada conexión tiene un peso. La unidad combina entradas y aplica una función de activación.

| Concepto | Contenido |
| --- | --- |
| Backpropagation | Propaga el error desde la salida hacia atrás y ajusta pesos repetidamente. |
| Entrenamiento | Encuentra pesos o umbrales de activación que estabilizan la red. |
| Almacenamiento | Los pesos conservan una abstracción de patrones, no filas originales. |
| Capacidad | Es finita. Más unidades y capas amplían patrones posibles, cómputo, tiempo y riesgo. |
| Interferencia | Ajustar pesos para una clase puede empeorar otra. |
| Encadenamiento | Una red reconoce metaconceptos y otra resuelve distinciones internas, reduciendo patrones simultáneos por subred. |

Deep Learning usa redes de múltiples capas para construir representaciones jerárquicas. La formulación operativa agrega buenas prácticas de preprocesamiento y encadenamiento de redes. Un tensor es un arreglo numérico multidimensional para representar lotes, imágenes, audio, texto o señales.

### Entrada de ML tradicional y Deep Learning

| Dimensión | ML tradicional | Deep Learning |
| --- | --- | --- |
| Representación | Matriz tabular con features diseñadas. | Tensores de alta dimensión. |
| Datos frecuentes | Numéricos y categóricos estructurados. | Imagen, audio, texto, video, señales y tablas. |
| Features | Mayor diseño manual. | Aprende representaciones internas, pero aún requiere preparación. |
| Volumen y cómputo | Habitualmente menores. | Habitualmente mayores, con unidades de procesamiento gráfico (GPU, *Graphics Processing Unit*) u otros aceleradores. |
| Interpretabilidad | Frecuentemente mayor. | Frecuentemente caja gris. |

<a id="regularizacion"></a>

## 10. Generalización y regularización

**Generalización:** capacidad de mantener desempeño sobre datos nuevos. **Underfitting:** modelo demasiado rígido, con error alto en train y validación. **Overfitting:** adaptación al detalle o ruido del train, con deterioro fuera de muestra.

**Bias:** error sistemático asociado con rigidez. **Variance:** sensibilidad a cambios de muestra. El equilibrio se evalúa por desempeño fuera del entrenamiento y estabilidad entre muestras.

### Fuentes de sobreajuste

1. **Dataset sesgado o poco representativo:** faltan patrones que sí existen en producción.
2. **Capacidad o entrenamiento mal calibrados:** el modelo se adapta al detalle o ruido del train.

Leakage y particiones que no representan producción pueden producir una evaluación engañosa y deben auditarse por separado. Una métrica muy alta exige revisar cómo se obtuvo antes de atribuirla a sobreajuste. En Iris, dataset estándar y curado, 97% puede ser esperable. Una caída de 96% en train y 95% en test a aproximadamente 75% en producción exige investigar representatividad, [drift](#mlops) o cambio de los datos productivos, leakage y sobreajuste.

### Técnicas

| Técnica | Mecanismo |
| --- | --- |
| L2 o Ridge | Penaliza pesos grandes al cuadrado y reduce magnitudes. |
| L1 o Lasso | Penaliza valores absolutos y puede llevar coeficientes a cero. |
| Elastic Net | Combina L1 y L2, útil con features correlacionadas. |
| Early stopping | Detiene cuando validación deja de mejorar. |
| Dropout | Desactiva unidades al azar para reducir coadaptación. |
| Data augmentation | Crea variaciones plausibles que preservan target y realidad. |
| Simplificación | Reduce profundidad, parámetros o features. |
| Más datos representativos | Amplía cobertura real, no repite los mismos sesgos. |

Datos sintéticos o aumentados deben validarse contra reglas estadísticas, físicas y de negocio. Si son pobres, amplifican ruido, sesgo o situaciones imposibles.

<a id="automl"></a>

## 11. Automated Machine Learning (AutoML)

AutoML automatiza tareas repetitivas de comparación, validación y ajuste. Recibe dataset preparado, target, tipo de problema, métrica, validación y presupuesto. Devuelve resultados comparables y pipelines, secuencias de transformaciones más modelo.

- **Preparación:** preprocesamientos estandarizados, selección o generación de features.
- **Modelado:** algoritmos, hiperparámetros y validación cruzada.
- **Ensambles:** bagging entrena en paralelo y combina; boosting corrige errores secuencialmente; stacking aprende a mezclar modelos.
- **Salida:** baseline, referencia simple que las alternativas deben superar, métricas, gráficos, modelo, pipeline o código exportable.

El equipo sigue a cargo del problema, la calidad, el leakage, la métrica, las particiones, los sesgos, las restricciones productivas, el monitoreo y la aprobación. La automatización concentra el trabajo humano en el problema y la interpretación.

| Herramienta | Uso |
| --- | --- |
| PyCaret | Comparación y baseline con pocas líneas. |
| Tree-based Pipeline Optimization Tool (TPOT) | Programación genética de pipelines, búsqueda con tiempo máximo y exportación de código estándar. Corrida de referencia: diez minutos. |
| H2O AutoML | Comparación, ensambles, tabla de resultados y análisis gráfico. |
| AutoFeat | Generación y selección automática de features tabulares. |
| Fast and Lightweight AutoML (FLAML) | Búsqueda liviana con presupuesto controlado. |
| LazyPredict | Baseline rápido de modelos básicos. |

La selección considera mantenimiento, licencia, reproducibilidad, exportación, seguridad, integración, observabilidad y costo. El responsable principal de seguridad de la información (CISO, *Chief Information Security Officer*) puede autorizar dependencias diferentes por ambiente. Exportar un pipeline estándar permite usar una herramienta flexible en desarrollo sin llevarla a producción.

<a id="xai"></a>

## 12. Explicabilidad, conocimiento y sesgos

La Inteligencia Artificial Explicable (XAI, *Explainable Artificial Intelligence*) reúne métodos para identificar qué variables influyeron en una salida. Busca pasar de una caja negra, cuyo razonamiento no es visible, hacia una caja blanca. Las redes profundas suelen quedar como caja gris porque la explicación es parcial. Una explicación puede ser **global**, comportamiento general, o **local**, una predicción particular.

| Herramienta | Alcance |
| --- | --- |
| Importancia de features | Peso global según el modelo, sin garantizar causalidad. |
| SHapley Additive exPlanations (SHAP) | Atribuciones locales y agregables basadas en contribuciones de variables. |
| Local Interpretable Model-agnostic Explanations (LIME) | Aproximación local interpretable alrededor de una observación. |
| Integrated Gradients | Atribuye importancia en redes mediante gradientes calculados desde una referencia. La referencia elegida afecta la explicación. |

La posición horizontal suele representar sentido y magnitud del impacto; el color puede representar valor alto o bajo. La leyenda concreta manda. La importancia puede cambiar entre observaciones.

### Utilidad

- **Diagnóstico:** detectar señales plausibles, atajos y features innecesarias.
- **Validación:** contrastar el comportamiento con especialistas.
- **Control:** auditar, responder reclamos y cumplir requisitos.
- **Conocimiento:** descubrir reglas de negocio y orientar nuevas features.

Las explicaciones validadas pueden destilarse en reglas IF condición THEN acción y alimentar conocimiento organizacional. No demuestran causalidad. La dinámica de sistemas de Forrester y Senge modela relaciones y retroalimentaciones que una predicción de ML puede no representar.

### Sesgos perjudiciales

Los datos históricos pueden reproducir o amplificar desigualdades. Eliminar una variable sensible no elimina necesariamente sus proxies, variables que la revelan indirectamente.

1. **Daño:** identificar grupos, variables sensibles y consecuencias posibles.
2. **Origen:** revisar representación, etiquetas, calidad y proxies en los datos.
3. **Pruebas:** construir conjuntos por grupos y pares contrafácticos.
4. **Medición:** comparar predicciones, tasas de error y resultados.
5. **Explicación:** analizar el comportamiento global y decisiones individuales.
6. **Mitigación:** intervenir en datos, features, objetivo, umbral o algoritmo.
7. **Registro:** documentar límites y riesgo residual.
8. **Seguimiento:** monitorear en producción porque el comportamiento puede cambiar.

Explicabilidad y fairness, equidad, evalúan aspectos distintos. Un modelo puede ser explicable y discriminatorio, o menos interpretable y mostrar mejores resultados entre grupos. La responsabilidad permanece en el equipo y la organización.

<a id="mlops"></a>

## 13. MLOps, monitoreo y drift

MLOps, *Machine Learning Operations*, versiona, despliega, observa y mantiene modelos. Conecta datos y modelado con ingeniería y operación, y comienza durante la viabilidad.

La referencia operativa es que aproximadamente 40% de los proyectos validados no llegan a producción por problemas de gestión. Los tres bloqueos principales son latencia, seguridad y cómputo. También importan integración, costo, concurrencia y dependencias.

### Artefacto y registro

- **Empaquetado:** incluir exactamente el preprocesamiento, transformaciones, modelo y configuración validados.
- **Versionado:** vincular código, datos, features, modelo, entorno, parámetros, hiperparámetros y métricas.
- **Datos:** Git versiona bien código, pero los datasets suelen requerir estrategias propias por su tamaño.
- **Trazabilidad:** registrar fecha, archivos, decisiones, entradas y salidas con controles de privacidad.
- **Observación:** medir latencia, errores, disponibilidad, memoria, unidad central de procesamiento (CPU, *Central Processing Unit*), GPU, distribuciones y desempeño contra **ground truth**, valor real confirmado que llega después de la predicción.
- **Experimentos:** MLflow los registra y permite recuperar una ejecución anterior, que puede ser mejor que la última.

### Drift

| Tipo | Cambio |
| --- | --- |
| Data drift | Distribución de entradas. |
| Concept drift | Relación entre entradas y target. |
| Prediction drift | Distribución de salidas del modelo. |
| Cambio de fuente | Pipeline, unidad, codificación o significado. |

Prediction drift indica que cambió la distribución de las salidas, pero su causa puede estar en los datos, la relación con el target o el pipeline. El diagnóstico precede a cualquier decisión de corregir, reentrenar, revertir o retirar.

El cierre desactiva servicios y automatizaciones, archiva evidencia, resuelve dependencias, comunica a usuarios, cumple retención y documenta lecciones.

<a id="llm"></a>

## 14. Large Language Model (LLM), Transformer y prompting

Un LLM es una red profunda entrenada con grandes corpus, colecciones de texto, para predecir tokens y generar continuaciones. Sus afirmaciones deben verificarse porque produce salidas probabilísticas y no consulta una base de datos de hechos.

1. **Tokenización:** divide texto en palabras, partes o signos.
2. **Embeddings:** transforma tokens en vectores.
3. **Posición:** representa el orden.
4. **Atención:** pondera qué partes del contexto son relevantes para cada token y procesa relaciones en paralelo.
5. **Predicción:** las capas Transformer calculan el token siguiente y repiten el proceso.

La genealogía conceptual es contexto de palabras, Bidirectional Encoder Representations from Transformers (BERT) como representación bidireccional, mecanismo de atención y Generative Pre-trained Transformer (GPT) como modelo generativo preentrenado. El preentrenamiento ajusta pesos y la inferencia utiliza esos pesos. La especialización posterior se compara con Retrieval Augmented Generation (RAG) en [RAG y bases vectoriales](#rag).

Visto desde afuera, el LLM simula un proceso cognitivo en sentido funcional: lee contexto, conserva relaciones, pondera lo relevante y construye una salida.

### Prompting

Un prompt contiene instrucciones y contexto. La ingeniería de prompts redacta y refina esa entrada. El esquema ROC organiza **rol, objetivo y contexto**, sin relación con la curva ROC de clasificación.

- **Pedido:** explicitar tarea, entradas, restricciones, formato y criterios de aceptación.
- **Contenido técnico:** para un pipeline de ML, detallar features y target, variables de entrada, transformaciones o ecuaciones, algoritmo e hiperparámetros, y pasos de implementación y prueba.
- **Descomposición:** dividir tareas complejas y revisar resultados intermedios.
- **Refinamiento:** corregir la instrucción con conocimiento del problema.

<a id="rag"></a>

## 15. RAG y bases vectoriales

RAG, *Retrieval Augmented Generation*, recupera fragmentos de un corpus, colección de documentos, y los agrega al contexto de un LLM. Cada chunk se almacena con embedding y metadata, como fuente, fecha y permisos.

### Tres limitaciones del LLM y tres ventajas de RAG

| LLM | RAG |
| --- | --- |
| Fine tuning costoso. | Incorpora conocimiento sin reentrenar el modelo completo. |
| Conocimiento obsoleto. | Actualiza documentos y reindexa. |
| Pesos opacos. | Traza fragmentos y fuentes recuperadas. |

También restringe el contexto a fuentes empresariales controladas.

### Pipeline

1. **Ingesta:** reunir documentos confiables, autorizados y actualizables.
2. **Fragmentación:** limpiar, dividir en chunks que conserven contexto y agregar metadata.
3. **Indexación:** crear embeddings y guardar vectores, texto y metadata.
4. **Consulta:** convertir la pregunta con el mismo modelo de embeddings.
5. **Recuperación:** buscar y filtrar los fragmentos más relevantes y permitidos.
6. **Generación:** entregar esos fragmentos al modelo para responder con contexto y fuentes.

### Recuperación

- **Medidas:** similitud coseno compara orientación; distancia euclídea, distancia recta; producto interno, orientación y magnitud.
- **Elección:** la medida depende del entrenamiento y normalización del embedding.
- **Índice:** Facebook Artificial Intelligence Similarity Search (FAISS) construye índices y busca vecinos. La relevancia y los permisos se validan fuera de la biblioteca.
- **Visualización:** PCA puede representar vectores en pocas dimensiones, pero no participa de la recuperación.

### Respuesta, alucinación y evaluación

Una consulta en lenguaje estructurado (SQL, *Structured Query Language*) exacta puede devolver cero filas. La búsqueda vectorial es difusa y siempre puede ordenar un vecino como el más cercano, aunque sea irrelevante. No existe un umbral universal verificado. Si lo recuperado no responde a la necesidad, se lo denomina alucinación en la lectura operativa. Técnicamente deben separarse recuperación irrelevante y generación sin respaldo.

Umbrales evaluados, filtros, reordenamiento, abstención y top K, cantidad de resultados recuperados, reducen errores. La corrección todavía debe comprobarse evaluando por separado relevancia de recuperación, fidelidad, citas, latencia y respuesta final.

RAG puede fallar por corpus, chunking, embeddings, consulta, metadata, top K, contexto o prompt. **Fine tuning** es entrenamiento adicional que modifica pesos o adaptadores para especializar una conducta estable; RAG no modifica el modelo y cambia el contexto por consulta. Pueden combinarse.

<a id="vibe"></a>

## 16. Vibe coding

Vibe coding desarrolla software con LLM mediante lenguaje natural. La compilación solo comprueba ciertos aspectos sintácticos y de tipos; arquitectura, contratos, seguridad y mantenibilidad requieren revisiones específicas.

### Método

1. **Fuentes:** construir una colección documental o corpus y una síntesis con contexto y referencias.
2. **Comparación:** buscar el estado del arte y contrastar evidencia a favor y en contra.
3. **Análisis:** estudiar en profundidad los trabajos seleccionados.
4. **Extracción:** identificar dataset, features, target, ecuaciones, arquitectura, hiperparámetros y pipeline.
5. **Especificación:** escribir en Markdown qué debe construirse y cómo se comprobará.
6. **Prototipo:** generar una primera versión con reglas, datos sintéticos y criterios de prueba.
7. **Verificación:** registrar decisiones, leer el código, probarlo y refinarlo.

NotebookLM consulta la colección documental, Gemini investiga, Consensus compara evidencia, Elicit y Paperguide analizan papers y Antigravity genera una implementación inicial.

### Riesgos

- **Amnesia de código:** el equipo deja de comprender estructura y decisiones.
- **Promedio funcional:** solución frecuente que puede compilar sin ser buena.
- **Colapso de diversidad:** entrenar modelos con código generado por modelos acentúa la media y reduce alternativas.
- **Costo de contexto:** depende de la cantidad de tokens necesarios para comunicar repositorio y relaciones. Seniors más gran consumo de tokens puede igualar o superar costos previos.
- **Exposición:** enviar repositorios amplios aumenta fuga, alcance impreciso y errores.
- **Falsa confianza:** tono seguro sin comprensión real.

### Control

El proceso sigue un embudo: arquitectura, patrones, módulos, contratos y código. Ese scaffolding o andamiaje comprime contexto y permite pedidos acotados. La única forma consistente de trabajar es pasarle al modelo los patrones requeridos y mantener revisión humana, pruebas, bitácora y aprobación.

El efecto Dunning Kruger describe sobreconfianza con conocimiento superficial. Adoptar la certeza del LLM como propia constituye sesgo heredado. Se contrarresta con conocimiento suficiente para interpelar, comparar y verificar.

<a id="agentes"></a>

## 17. Agentes y orquestación

**Agente:** programa que percibe información y ejecuta acciones para cumplir un objetivo dentro de permisos definidos. A diferencia de un programa que exige entradas en una posición o formato rígidos, percibe el estado y adapta su acción. Sus propiedades son autonomía limitada, reactividad, proactividad y comunicación.

**Orquestador:** decide qué agente o herramienta usar, en qué orden, con qué contexto y condiciones. El valor del sistema surge de las capacidades asignadas a los agentes y de su coordinación.

La integración empresarial combina ML o Deep Learning para detectar patrones, RAG para aportar conocimiento documental actualizable y agentes para ejecutar tareas bajo un orquestador.

| Tipo | Decisión | Memoria |
| --- | --- | --- |
| Reflejo simple | Reglas condición y acción. | No. |
| Basado en modelo | Estado interno del entorno. | Sí. |
| Basado en objetivos | Acciones que acercan a una meta. | Usualmente. |
| Basado en utilidad | Compara alternativas por valor esperado. | Sí. |

### Sistemas multiagente

- **División:** separan el problema en agentes especializados con contratos de entrada y salida.
- **Intercambio:** mejoran modularidad y reemplazo, pero agregan coordinación, observabilidad, seguridad, memoria y fallas distribuidas.
- **Orquestación:** flujo predefinido. n8n y Zapier automatizan pasos y eventos.
- **Colaboración:** un planificador arma o revisa el plan dinámicamente.
- **Blackboard:** memoria común donde los agentes leen y escriben estado.

Model Context Protocol (MCP) estandariza descubrimiento y uso de herramientas o recursos. La planificación, identidad, autorización y seguridad se implementan mediante componentes adicionales.

Hermes representa un asistente planificador sobre un orquestador. Puede usar una base de casos: recupera problemas resueltos, adapta un plan y conserva referencias operativas. El plan adaptado debe validarse antes de ejecutarse.

**Human in the loop** significa que una persona participa explícitamente en una decisión, validación o aprobación del sistema.

Más autonomía exige permisos mínimos, aislamiento, presupuestos, tiempos máximos, validación, registro, aprobación humana y capacidad de detener o revertir.

<a id="seguridad"></a>

## 18. Seguridad en aplicaciones con LLM

La salida probabilística de un LLM no puede decidir autorizaciones ni sustituir validación, aislamiento o permisos. Esos controles deben ser determinísticos y externos. La tabla reúne riesgos del Open Worldwide Application Security Project (OWASP) Top 10 para aplicaciones de LLM, edición 2025, y riesgos complementarios.

| Riesgo | Falla | Control |
| --- | --- | --- |
| **1. Prompt injection** | Entrada directa o contenido externo cambia instrucciones, decisiones o herramientas. | Separar datos e instrucciones, tratar contenido como no confiable, limitar herramientas y validar acciones. |
| **2. Información sensible** | Fuga de información personal identificable (PII, *Personally Identifiable Information*), secretos, propiedad intelectual, credenciales o contexto entre usuarios. | Minimizar, clasificar, ocultar y controlar accesos. Nunca poner secretos en prompts. |
| **3. Supply chain** | Modelos, adaptadores, paquetes, plugins, proveedores o repositorios comprometidos. | Verificar origen y firmas, inventariar componentes, fijar versiones y evaluar terceros. |
| **4. Data and model poisoning** | Datos de entrenamiento, fine tuning o embeddings manipulados alteran el comportamiento. | Curar datos, controlar escrituras, versionar, detectar anomalías y revertir. |
| **5. Manejo inseguro de salida** | Texto generado se ejecuta como comando, SQL, lenguaje de marcado de hipertexto (HTML, *HyperText Markup Language*) o script. | Validar estructura, parametrizar, neutralizar caracteres y separar texto de ejecución. |
| **6. Agencia excesiva** | Permisos o autonomía producen acciones reales dañinas. | Permisos mínimos, acciones acotadas, sandbox y aprobación humana. |
| **7. System prompt leakage** | Exposición de configuración interna. | No considerar secreto al prompt ni usarlo como autorización. |
| **8. Vector and embedding weaknesses** | Recuperación sin permiso, documentos maliciosos o mezcla entre usuarios. | Permisos antes y después de recuperar, aislamiento y validación de metadata. |
| **9. Misinformation** | Contenido falso o sin respaldo se usa para decidir. | Fuentes, citas, abstención, revisión y verificación. |
| **10. Unbounded consumption** | Bucles, prompts o automatizaciones agotan tokens y presupuesto. | Cuotas, límites, presupuestos, contexto y tiempos máximos. |

### Distinciones

- **Inyección directa:** instrucción hostil escrita por el usuario.
- **Inyección indirecta:** instrucción dentro de web, correo, formato de documento portátil (PDF, *Portable Document Format*), imagen o documento recuperado.
- **Jailbreak:** intento de evadir restricciones de conducta.
- **RAG:** agrega poisoning de la colección de documentos o corpus, fuga por permisos, inyección indirecta, abuso de metadata y fuentes adulteradas.

El National Institute of Standards and Technology Artificial Intelligence Risk Management Framework (NIST AI RMF) organiza el riesgo mediante gobernar, mapear, medir y gestionar. Evalúa validez y confiabilidad, seguridad operativa, protección y resiliencia, responsabilidad y transparencia, explicabilidad, privacidad y equidad. Su aplicación se complementa con los controles técnicos correspondientes.

<a id="cobots"></a>

## 19. Aplicaciones industriales

Cobots, mantenimiento y gemelos digitales son aplicaciones de las familias de ML ya definidas y combinan percepción, predicción, simulación y decisión.

### Robots y cobots

| Robot tradicional | Cobot |
| --- | --- |
| Tarea y espacio controlados, normalmente fijo, aislado y con secuencia previsible. | Comparte espacio mediante percepción, limitación de fuerza, sensores y control adaptativo. La seguridad debe evaluarse para cada tarea compartida. |

1. **1950 a fines de los 60:** hidráulica, sensores básicos y jaulas.
2. **Década de 1970 hasta 1999:** controladores lógicos programables (PLC, *Programmable Logic Controller*) y robots programables fijos, con poca percepción.
3. **Desde 2000, cuarta generación:** cobots, autopercepción, fuerza y detección de personas.
4. **Últimos cinco años de la periodización, quinta generación:** nube, movilidad, Deep Learning e IA generativa.

La periodización ordena la evolución tecnológica usada en el apunte y puede diferir de otras clasificaciones de robótica. Un cobot requiere sensores de fuerza y contacto, movilidad o gestión de energía cuando corresponde, y visión artificial no invasiva para percibir entorno, personas, piezas y defectos. Kinesthetic teaching, guiado cinestésico, permite enseñar trayectorias moviendo físicamente el brazo.

### Mantenimiento

| Estrategia | Decisión |
| --- | --- |
| Reactivo | Intervenir después de la falla. |
| Preventivo | Intervenir por calendario o uso. |
| Predictivo | Estimar qué fallará y cuándo. |
| Prescriptivo | Recomendar qué acción conviene realizar. |

- **Tiempo medio entre fallas (MTBF, *Mean Time Between Failures*):** caracteriza la confiabilidad del equipo.
- **Efectividad general del equipo (OEE, *Overall Equipment Effectiveness*):** se vincula con disponibilidad, rendimiento y calidad. Referencia: 89% de efectividad, sin paradas imprevistas y con detenciones predichas.

### Gemelo digital

Representación digital conectada con un activo o proceso real. Modela estado, comportamiento e interacción para simular desgaste, consumo, fallas y configuraciones. Los datos sintéticos requieren calibración. Las redes neuronales informadas por física (PINN, *Physics Informed Neural Networks*) incorporan leyes físicas como restricciones para excluir comportamientos imposibles.

La infraestructura condiciona la solución: integración de fábrica, conectividad, cifrado, energía, disipación, latencia y ubicación del cómputo pueden ser tan importantes como el modelo.
