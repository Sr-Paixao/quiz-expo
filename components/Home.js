import React from 'react';
import { Button, View } from 'react-native';

// Definindo o componente Home
export default function Home({ navigation }) {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ marginBottom: 15 }}>
                <Button title="Adicionar Pergunta" onPress={() => navigation.navigate('Add')} />
            </View>

            <View style={{ marginBottom: 15 }}>
                <Button title="Iniciar Quiz" onPress={() => navigation.navigate('Quiz')} color="green" />
            </View>

            <Button title="Editar Perguntas" onPress={() => navigation.navigate('Edit')} color="gold" />
        </View>
    );
}
