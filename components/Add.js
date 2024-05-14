import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quiz.db');

export default function Add() {
    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [respostaCorreta, setRespostaCorreta] = useState('');

    // Criando a tabela 'perguntas' se ela não existir no banco de dados
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS perguntas (id INTEGER PRIMARY KEY AUTOINCREMENT, pergunta TEXT, alternativaA TEXT, alternativaB TEXT, alternativaC TEXT, alternativaD TEXT, resposta_correta TEXT)'
        );
    });

    // Função para adicionar uma pergunta ao banco de dados
    const adicionarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO perguntas (pergunta, alternativaA, alternativaB, alternativaC, alternativaD, resposta_correta) VALUES (?, ?, ?, ?, ?, ?);',
                [pergunta, alternativaA, alternativaB, alternativaC, alternativaD, respostaCorreta],
                (_, { insertId }) => {
                    setPergunta('');
                    setAlternativaA('');
                    setAlternativaB('');
                    setAlternativaC('');
                    setAlternativaD('');
                    setRespostaCorreta('');
                    Alert.alert('Sucesso!', 'Pergunta adicionada com sucesso!');
                }
            );
        });
    };

    return (
        <View style={{ alignItems: 'center' }}>
            <TextInput
                placeholder="Digite a pergunta"
                value={pergunta}
                multiline={true}
                onChangeText={setPergunta}
                numberOfLines={4}
                style={{ height: 80, borderColor: 'blue', borderWidth: 1, marginBottom: 15, width: '90%' }}
            />
            <TextInput
                placeholder="Digite a alternativa A"
                value={alternativaA}
                onChangeText={setAlternativaA}
                style={{ borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%', height: 50 }}
            />
            <TextInput
                placeholder="Digite a alternativa B"
                value={alternativaB}
                onChangeText={setAlternativaB}
                style={{ borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%', height: 50 }}
            />
            <TextInput
                placeholder="Digite a alternativa C"
                value={alternativaC}
                onChangeText={setAlternativaC}
                style={{ borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%', height: 50 }}
            />
            <TextInput
                placeholder="Digite a alternativa D"
                value={alternativaD}
                onChangeText={setAlternativaD}
                style={{ borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%', height: 50 }}
            />
            <TextInput
                placeholder="Digite a letra da resposta correta"
                value={respostaCorreta}
                onChangeText={setRespostaCorreta}
                style={{ borderColor: 'blue', borderWidth: 1, marginBottom: 5, width: '90%', height: 50 }}
            />
            <Button title="Adicionar Pergunta" onPress={adicionarPergunta} />
        </View>
    );
}
