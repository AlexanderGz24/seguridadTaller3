<template>
    <v-layout>
        <navbarTaller3 />
        <v-main>
            <h1> Datos Generales:</h1>
            <div>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="overpressure" label="Overpressure (%)" type="number"></v-text-field>

                        <v-text-field v-model="setPressure" label="Presión de set (MPa)" type="number"></v-text-field>

                        <v-text-field v-model="accumulatedBackPressure" label="Contrapresión acumulada (kPa)"
                            type="number"></v-text-field>
                        <v-text-field v-model="qm" label="Qm toneladas/hora" type="number"></v-text-field>
                        <v-text-field v-model="Patm" label="Patm (kPa)" type="number"></v-text-field>
                        <v-text-field v-model="y" label="y" type="number"></v-text-field>
                        <v-text-field v-model="Kc" label="Kc" type="number"></v-text-field>
                        <v-text-field v-model="Tc" label="Tc (k)" type="number"></v-text-field>

                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="superimposedBackPressure" label="Contrapresión superimpuesta (kPa)"
                            type="number"></v-text-field>

                        <v-text-field v-model="fluid" label="Fluido"></v-text-field>

                        <v-text-field v-model="temperature" label="Temperatura (°C)" type="number"></v-text-field>

                        <v-text-field v-model="C0" label="C0" type="number"></v-text-field>
                        <v-text-field v-model="SG" label="SG" type="number"></v-text-field>
                        <v-text-field v-model="M" label="M (gr/mol)" type="number"></v-text-field>
                        <v-text-field v-model="Kv" label="Kv" type="number"></v-text-field>
                        <v-text-field v-model="Pc" label="Pc (bar)" type="number"></v-text-field>
                    </v-col>
                </v-row>


            </div>

            <div>
                <div align="center">
                    <h1>Ejercicio 1</h1>
                    <v-img style="height: 20%;width: 50%;" src="/img/diagrama1.JPG"></v-img>
                </div>
                <h2>Cálculos:</h2>
                <br>
                <h3>Presión super impuesta: {{ (superimposedBackPressure + Patm) * kPaToPsi }} psi </h3>
                <h3>Presión contra presión acumulada: {{ (accumulatedBackPressure + Patm) * kPaToPsi }} psi </h3>
                <h3>back pressupre: {{ (accumulatedBackPressure + Patm) * kPaToPsi + (superimposedBackPressure +
                            Patm) * kPaToPsi }} psi </h3>
                <h3>P RMS: {{ (setPressure * 1000 * kPaToPsi) * (1 + overpressure / 100) }} psi </h3>

                <h2>Para el hidrógeno:</h2>
                <h3> Temperatura: {{ temperature + 273.15 }} k</h3>
                <h3> Presión= P RMS: {{ (setPressure * 1000 * kPaToPsi) * (1 + overpressure / 100) }} psi </h3>
                <h2>Hallando kb para válvula Balanced-bellow:</h2>
                <v-row>
                    <v-col cols="6">
                        <v-img style="width: 80%;" src="/img/diagramakb.JPG"></v-img>
                    </v-col>
                    <v-col cols="6">
                        <h3> Temperatura: {{ temperature + 273.15 }} k</h3>
                        <h3> Presión= P RMS: {{ (setPressure * 1000) * (1 + overpressure / 100) }} kPa</h3>
                        <h3> Pb: {{ (((accumulatedBackPressure + Patm) * kPaToPsi + (superimposedBackPressure +
                            Patm) * kPaToPsi)) / ((setPressure * 1000 * kPaToPsi) * (1 + overpressure / 100)) * 100 }}
                        </h3>
                        <h3>y: {{ y }}</h3>
                        <v-text-field v-model="Kb" label="Kb" type="number"></v-text-field>
                        <br>
                        <br>
                        <div align="right">

                            <v-btn color="blue" @click="calcularabyCoeficientes">Calcular coeficientes</v-btn>
                        </div>
                        <div v-if="mostratCoeficientes">
                            <h3>R= {{ R }} L.atm/mol.K</h3>
                            <h3>a= (27*R^2 * Tc^2)/64*Pc={{ a }}
                                atm*(L/mol)^2
                            </h3>
                            <h3>b= (R*Tc)/8*Pc={{ b }} L/mol</h3>
                            <br>
                            <div align="right">
                                <v-btn color="blue" @click="calcularVolumenMolar">Calcular volumen molar y Área</v-btn>
                            </div>
                            <div v-if="mostrarVolumenMolar">
                                <h2>Coeficientes para la ecuación de estado cúbica:</h2>
                                <br>
                                <h3> A= 1</h3>
                                <h3>B= b+R*T/P: {{ B }} m^3/mol</h3>
                                <h3>C= a/P={{ C }} m^6/mol^2</h3>
                                <h3> D= a*b/P: {{ D }} m^9/mol^3</h3>
                                <br>
                                <h3>A* V^3 - B* V^2+C* V-D=0</h3>
                                <br>
                                <h3>Volumen molar: {{ volumenMolar }} m^3/mol</h3>
                                <h3>Z: {{ Z }}</h3>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <div v-if="mostrarVolumenMolar">
                    <h2>Cálculo del área</h2>
                    <v-row>
                        <v-col cols="6">
                            <v-img style="width: 30%;" src="/img/X.JPG"></v-img>
                            <h3>X ={{ X }}</h3>
                        </v-col>
                        <v-col cols="6">
                            <v-img style="width: 30%;" src="/img/Area.JPG"></v-img>
                            <h3 style="color:brown;">Área= {{ Area }} in^2</h3>
                        </v-col>
                    </v-row>
                    <h3>Tamaño del orificio: {{ tamanioOrificio1 }}</h3>
                </div>

            </div>
            <hr>
            <br>
            <hr>
            <br>
            <div align="center">
                <h1>Ejercicio 2 </h1>
            </div>
            <hr>
            <div align="center">
                <v-img style="height: 20%;width: 50%;" src="/img/diagrama2.JPG"></v-img>
                <v-img style="height: 20%;width: 50%;" :src="`/img/diagrama2.JPG`"></v-img>



            </div>

            <v-row>
                <v-col cols="6">
                    <v-text-field v-model="qm2" label="ton/hora" type="number"></v-text-field>

                </v-col>
                <v-col cols="6">
                    <h3 style="color:brown;">
                        Área 2: {{ Area2 }} in^2
                    </h3>
                </v-col>
                <h3>TTamaño del orificio: {{ tamanioOrificio2 }}</h3>
            </v-row>

            <div align="right">
                <v-btn color="blue" @click="calcularArea2">Calculo de Área 2</v-btn>
            </div>
        </v-main>

    </v-layout>
</template>


<script>
import navbarTaller3 from '../components/common/navbarTaller3.vue'
import { polynomialRoot } from 'mathjs';
export default {
    data() {
        return {
            base: "/seguridadTaller3",
            overpressure: 16,
            setPressure: 12,
            accumulatedBackPressure: 50,
            superimposedBackPressure: 10,
            fluid: 'Hidrógeno',
            temperature: 40,
            qm: 45 / 2,
            qm2: 0,
            C0: 0.61,
            SG: 1,
            Patm: 101.3,
            kPaToPsi: 0.145038,
            barToAtm: 0.986923,
            kPaToAtm: 1 / 101.325,
            y: 1.405,
            M: 2.016,
            Kc: 0.9,
            Kv: 1,
            Kb: 1,
            Tc: 33.19,
            Pc: 13.13,
            R: 0.08205746,
            R2: 8.314,
            mostrarVolumenMolar: false,
            mostratCoeficientes: false,
            volumenMolar: 0,
            a: 0,
            b: 0,
            X: 0,
            Area: 0,
            Area2: null,
            m2ToInc2: 1550,
            tamanioOrificio1: [],
            tamanioOrificio2: []
        };
    },

    mounted() {

    },
    components: {
        navbarTaller3,
    },
    methods: {
        calcularabyCoeficientes() {
            this.mostratCoeficientes = true
            const a = (27 * this.R ** 2 * this.Tc ** 2) / (64 * this.Pc * this.barToAtm)
            const b = (this.R * this.Tc) / (8 * this.Pc * this.barToAtm)

            this.a = parseFloat(a.toFixed(3))
            this.b = parseFloat(b.toFixed(3))

        },
        calcularVolumenMolar() {
            this.mostrarVolumenMolar = true
            const A = 1

            //const B = -(((this.R * this.Tc) / (8 * this.Pc)) + (this.R * (this.temperature + 273.15) / ((this.setPressure * 1000) * (1 + this.overpressure / 100) * this.kPaToAtm))) / 1000
            const B = -(((this.b)) + (this.R * (this.temperature + 273.15) / ((this.setPressure * 1000) * (1 + this.overpressure / 100) * this.kPaToAtm))) / 1000
            const C = ((this.a) / ((this.setPressure * 1000) * (1 + this.overpressure / 100) * this.kPaToAtm)) / 1000000
            const D = -(((this.a) * (this.b)) / ((this.setPressure * 1000) * (1 + this.overpressure / 100) * this.kPaToAtm)) / 1000000000
            this.B = B
            this.C = C
            this.D = D
            console.log(A)
            console.log(B)
            console.log(C)
            console.log(D)
            const roots = polynomialRoot(D, C, B, A);
            console.log(roots)
            this.volumenMolar = roots[0]
            const Z = (this.volumenMolar * ((this.setPressure * 1000) * (1 + this.overpressure / 100) * this.kPaToAtm)) / (this.R * (this.temperature + 273.15)) * 1000
            this.Z = Z
            this.calcularArea()

        },
        calcularArea() {
            const gc = 1
            const exponente = (this.y + 1) / (this.y - 1)
            const X = ((gc / this.R2) * this.y * ((2 / (this.y + 1)) ** exponente)) ** 0.5
            this.X = parseFloat(X.toFixed(3))
            console.log(this.X)

            const Area = ((this.qm) / (this.X * this.C0 * this.Kb * this.Kc * this.Kv * ((this.setPressure * 1000) * (1 + this.overpressure / 100)))) * ((((this.temperature + 273.15) * this.Z) / this.M) ** 0.5)
            this.Area = Area * ((1000 ** 0.5) / 3600) * this.m2ToInc2
            console.log(this.Area)
            this.tamanioOrificio1 = this.tamanioOrificioPorArea(this.Area)
        },
        calcularArea2() {
            const gc = 1
            const exponente = (this.y + 1) / (this.y - 1)
            const X = ((gc / this.R2) * this.y * ((2 / (this.y + 1)) ** exponente)) ** 0.5
            this.X = parseFloat(X.toFixed(3))
            console.log(this.X)

            const Area = ((this.qm2) / (this.X * this.C0 * this.Kb * this.Kc * this.Kv * ((this.setPressure * 1000) * (1 + this.overpressure / 100)))) * ((((this.temperature + 273.15) * this.Z) / this.M) ** 0.5)
            this.Area2 = Area * ((1000 ** 0.5) / 3600) * this.m2ToInc2
            console.log(this.Area2)
            this.tamanioOrificio2 = this.tamanioOrificioPorArea(this.Area2)
        },
        tamanioOrificioPorArea(area) {
            const tamanios = {
                'D': 0.110,
                'E': 0.196,
                'F': 0.307,
                'G': 0.503,
                'H': 0.785,
                'J': 1.287,
                'K': 1.838,
                'L': 2.853,
                'M': 3.600,
                'P': 6.380,
                'Q': 11.040,
                'R': 16.000,
                'T': 26.000,
                'NA': Infinity // Para manejar el caso en que el área sea mayor que 26.000
            };

            for (let tam in tamanios) {
                if (area <= tamanios[tam]) {
                    if (tam === 'NA') {
                        return ['NA', "Na'' x Na'' ", 'Na'];
                    }
                    return [tam, this.obtenerDimension(tam), tamanios[tam]];
                }
            }
        },

        obtenerDimension(tam) {
            // Definir las dimensiones para cada tamaño de válvula
            const dimensiones = {
                'D': "1'' x 2'' ",
                'E': "1'' x 2'' ",
                'F': "1.5'' x 2'' ",
                'G': "2'' x 3'' ",
                'H': "2'' x 3'' ",
                'J': "2.5'' x 4'' ",
                'K': "3'' x 4'' ",
                'L': "4'' x 6'' ",
                'M': "4'' x 6'' ",
                'P': "4'' x 6'' ",
                'Q': "6'' x 8'' ",
                'R': "6'' x 10'' ",
                'T': "8'' x 10'' ",
            };

            return dimensiones[tam];
        }
    }

}

</script>