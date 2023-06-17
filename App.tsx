/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  Button,
  PaperProvider,
  FAB,
  useTheme,
  Menu,
  IconButton,
} from 'react-native-paper';
import {Provider} from 'react-native-paper/lib/typescript/src/core/settings';
// import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, setText] = useState('press me');

  const [yearMenuVisible, setYearMenuVisible] = useState<boolean>(false);
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const theme = useTheme();
  const {colors} = theme;

  const [date, setDate] = useState<Date>(new Date());
  const [timeFrame, setTimeFrame] = useState<string>('Year');
  const [open, setOpen] = useState(false);
  // const transactions = useAppSelector(
  //   state => state.transactionsState.transactions,
  // );

  const newTimeFrame = (frame: string) => {
    setTimeFrame(frame);
    setYearMenuVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      height: '100%',
      width: '100%',
      padding: '4%',
    },

    flatList: {
      backgroundColor: 'red',
      maxHeight: '20%',
      width: '100%',
    },

    greetingText: {
      marginBottom: '10%',
    },

    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.onPrimary,
    },
    filterButtonsContainer: {
      flexDirection: 'row',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    yearFilterContainer: {
      flexDirection: 'row',
      width: '48%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100%',
      backgroundColor: colors.primary,
      borderTopLeftRadius: theme.roundness,
      borderBottomLeftRadius: theme.roundness,
    },
    dateFilterContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '48%',
      height: '100%',
      alignItems: 'center',
      borderTopRightRadius: theme.roundness,
      borderBottomRightRadius: theme.roundness,
      backgroundColor: colors.secondary,
    },
    bottomRightFAB: {
      position: 'absolute',
      bottom: '2.5%',
      right: '2.5%',
      backgroundColor: colors.primary,
    },
  });

  useEffect(() => {
    console.log('date = ' + JSON.stringify(date));
  }, [date]);

  useEffect(() => {
    console.log('year scope thing =' + yearMenuVisible);
  }, [yearMenuVisible]);

  const filters = (
    <View
      style={{
        // paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        // width: '90%',
        alignSelf: 'center',
      }}>
      <Menu
        contentStyle={{backgroundColor: colors.primary}}
        visible={yearMenuVisible}
        onDismiss={() => {
          setYearMenuVisible(false);
        }}
        anchor={
          <View style={styles.filterButtonsContainer}>
            <TouchableOpacity
              onPress={() => setYearMenuVisible(true)}
              style={styles.yearFilterContainer}>
              <IconButton icon="menu-down" iconColor={colors.onPrimary} />
              <Text style={{color: colors.onPrimary}}>{timeFrame}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDateModalVisible(true)}
              style={styles.dateFilterContainer}>
              <Text style={{color: colors.onSecondary}}>
                {date
                  ? `${
                      date.getMonth() + 1
                    }/${date.getDate()}/${date.getFullYear()}`
                  : 'mm/dd/yyyy'}
              </Text>
              <IconButton
                icon="calendar-today"
                iconColor={colors.onSecondary}
              />
            </TouchableOpacity>
          </View>
        }>
        <Menu.Item
          theme={theme}
          titleStyle={{color: colors.onPrimary}}
          onPress={() => newTimeFrame('Year')}
          title="Year"
        />
        <Menu.Item
          theme={theme}
          titleStyle={{color: colors.onPrimary}}
          onPress={() => newTimeFrame('Month')}
          title="Month"
        />
        <Menu.Item
          theme={theme}
          titleStyle={{color: colors.onPrimary}}
          onPress={() => newTimeFrame('Week')}
          title="Week"
        />
        <Menu.Item
          theme={theme}
          titleStyle={{color: colors.onPrimary}}
          onPress={() => newTimeFrame('Day')}
          title="Day"
        />
      </Menu>
    </View>
  );

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          // barStyle={'light-content'}
          barStyle={'dark-content'}
          animated={true}
          backgroundColor={styles.container.backgroundColor}
        />

        {/* <View style={{height: '24%', width: '100%'}}> */}
        {/* <LineGraph data={[1, 10, 3, 5]} theme={theme} /> */}
        {/* </View> */}

        {filters}

        {dateModalVisible && (
          <View style={{marginTop: '7.5%', height: '70%'}}>
            {/* <DatePicker
              visible={dateModalVisible}
              setVisible={setDateModalVisible}
              date={date}
              onConfirm={setDate}
              theme={theme}
            /> */}
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: '5%',
            justifyContent: 'space-between',
            marginTop: '7.5%',
          }}>
          {/* {transactions.map(transaction => (
            <TransactionSummery
              retailer={transaction.transacteeName}
              date={monthDateYearDisplay(transaction.date)}
              amount={transaction.getTotal()}
              theme={theme}
            />
          ))} */}
        </View>

        <FAB
          size={'small'}
          mode="flat"
          collapsable
          style={styles.bottomRightFAB}
          theme={theme}
          icon="cart-plus"
          label={'Add Receipt'}
          color={colors.onPrimary}
          // onPress={() => navigation.navigate('CameraScreen')} // i'll use camera once i can test on physical device.
          onPress={() => {}} //navigation.navigate('Transactions')}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}

export default App;
