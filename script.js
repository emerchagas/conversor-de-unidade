//Variaveis para definir as unidades de medida para cada categoria
var unidadesDeMedida = {
    comprimento: ['metros', 'centímetros', 'polegadas'],
    peso: ['quilogramas', 'gramas', 'libras'],
    temperatura: ['Celsius', 'Fahrenheit', 'Kelvin']
};

// Essa Função para atualizar as opções de unidades de medida de origem e destino
function atualizarUnidades() {
    var categoria = document.getElementById('categoria').value;
    var origemSelect = document.getElementById('origem');
    var destinoSelect = document.getElementById('destino');

    // Aqui limpa as opções existentes dentro das caixas
    origemSelect.innerHTML = '';
    destinoSelect.innerHTML = '';

    // Adicionar as opções da categoria selecionada
    unidadesDeMedida[categoria].forEach((unidade) => {
        var origemOption = document.createElement('option');
        origemOption.text = unidade;
        origemSelect.add(origemOption);

        var destinoOption = document.createElement('option');
        destinoOption.text = unidade;
        destinoSelect.add(destinoOption);
    });
}

// Essa função para realizar a conversão de unidades
function converter() {
    var valor = parseFloat(document.getElementById('valor').value);
    var categoria = document.getElementById('categoria').value;
    var origem = document.getElementById('origem').value;
    var destino = document.getElementById('destino').value;

    let resultado;

    if (categoria === 'comprimento') {
        resultado = converterComprimento(valor, origem, destino);
    } else if (categoria === 'peso') {
        resultado = converterPeso(valor, origem, destino);
    } else if (categoria === 'temperatura') {
        resultado = converterTemperatura(valor, origem, destino);
    }

    document.getElementById('resultado').textContent = `${valor} ${origem} é igual a ${resultado} ${destino}`;
}

// Essa funções serve para converter as unidades específicas
function converterComprimento(valor, origem, destino) {
    var fatores = {
        metros: 1,
        centímetros: 100,
        polegadas: 39.3701
    };

    var valorEmMetros = valor / fatores[origem];
    return valorEmMetros * fatores[destino];
}

function converterPeso(valor, origem, destino) {
    var fatores = {
        quilogramas: 1,
        gramas: 1000,
        libras: 2.20462
    };

    var valorEmQuilogramas = valor / fatores[origem];
    return valorEmQuilogramas * fatores[destino];
}

function converterTemperatura(valor, origem, destino) {
    let resultado;

    if (origem === 'Celsius') {
        if (destino === 'Fahrenheit') {
            resultado = (valor * 9 / 5) + 32;
        } else if (destino === 'Kelvin') {
            resultado = valor + 273.15;
        } else {
            resultado = valor;
        }
    } else if (origem === 'Fahrenheit') {
        if (destino === 'Celsius') {
            resultado = (valor - 32) * 5 / 9;
        } else if (destino === 'Kelvin') {
            resultado = (valor + 459.67) * 5 / 9;
        } else {
            resultado = valor;
        }
    } else if (origem === 'Kelvin') {
        if (destino === 'Celsius') {
            resultado = valor - 273.15;
        } else if (destino === 'Fahrenheit') {
            resultado = (valor * 9 / 5) - 459.67;
        } else {
            resultado = valor;
        }
    }

    return resultado.toFixed(2);
}

// Chamar a função atualizarUnidades ao carregar a página
window.onload = atualizarUnidades;

// fim do JS