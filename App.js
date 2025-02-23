import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';
SystemUI.setBackgroundColorAsync('#1e085a');

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const startAddGoalHandler = () => {
    setIsModalVisible(true);
  };

  const endAddGoalHandler = () => {
    setIsModalVisible(false);
  };

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='#a065ec'
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={isModalVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});
