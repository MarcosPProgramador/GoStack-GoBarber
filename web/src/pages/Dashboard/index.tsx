import { format, getHours, isToday, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import defaultAvatarImg from '../../static/default-avatar.jpg';
import logoSvg from '../../static/logo.svg';
import {
  Appointment,
  Calendar,
  Container,
  Content,
  Converge,
  Header,
  NextAppointment,
  Profile,
  Schedule,
  Section,
} from './styles';

interface MonthAvailability {
  day: number;
  available: boolean;
}
interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}
const Dashboard: React.FC = () => {
  const { colors } = useTheme();
  const { signOut, user } = useAuth();
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);
  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);
  useEffect(() => {
    api
      .get<Appointment[]>(`/appointments/me`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentFormatted);
      });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    return monthAvailability
      .filter(monthItem => monthItem.available === false)
      .map(({ day }) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, day);
      });
  }, [currentMonth, monthAvailability]);

  const dateFormatedOnDayAndMonth = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const dateFormatedOnWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  const showsTheHTMLElementIfItIsToday = useMemo(() => {
    return isToday(selectedDate) && <span>Hoje</span>;
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return getHours(parseISO(appointment.date)) < 12;
    });
  }, [appointments]);
  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return getHours(parseISO(appointment.date)) >= 12;
    });
  }, [appointments]);

  return (
    <Container>
      <Header>
        <Converge>
          <img src={logoSvg} alt="GoBarber" />

          <Profile to="/profile">
            <img src={user.avatar_url || defaultAvatarImg} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower size={20} color={colors.sub} />
          </button>
        </Converge>
      </Header>
      <Content>
        <Converge>
          <Schedule>
            <h1>Horários agendados</h1>
            <p>
              {showsTheHTMLElementIfItIsToday}
              <span>{dateFormatedOnDayAndMonth}</span>
              <span>{dateFormatedOnWeekDay}</span>
            </p>
            <NextAppointment>
              <h3>Atendimento a seguir</h3>
              <div>
                <img src={defaultAvatarImg} alt="..." />

                <strong>Marcos Proença</strong>
                <span>
                  <FiClock size={20} color={colors.orange} />
                  08:00
                </span>
              </div>
            </NextAppointment>
            <Section>
              <strong>Manhã</strong>
              {morningAppointments.map(morningAppointment => (
                <Appointment key={morningAppointment.id}>
                  <span>
                    <FiClock size={20} color={colors.orange} />
                    {morningAppointment.hourFormatted}
                  </span>
                  <div>
                    <img
                      src={
                        morningAppointment.user.avatar_url || defaultAvatarImg
                      }
                      alt={morningAppointment.user.name}
                    />

                    <strong>{morningAppointment.user.name}</strong>
                  </div>
                </Appointment>
              ))}
            </Section>
            <Section>
              <strong>Tarde</strong>
              {afternoonAppointments.map(afternoonAppointment => (
                <Appointment key={afternoonAppointment.id}>
                  <span>
                    <FiClock size={20} color={colors.orange} />
                    {afternoonAppointment.hourFormatted}
                  </span>
                  <div>
                    <img
                      src={
                        afternoonAppointment.user.avatar_url || defaultAvatarImg
                      }
                      alt={afternoonAppointment.user.name}
                    />

                    <strong>{afternoonAppointment.user.name}</strong>
                  </div>
                </Appointment>
              ))}
            </Section>
          </Schedule>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              disabledDays={[
                {
                  daysOfWeek: [0, 6],
                },
                ...disabledDays,
              ]}
              modifiers={{
                available: {
                  daysOfWeek: [1, 2, 3, 4, 5],
                },
              }}
              selectedDays={selectedDate}
              onMonthChange={handleMonthChange}
              onDayClick={handleDateChange}
              fromMonth={new Date()}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        </Converge>
      </Content>
    </Container>
  );
};

export default Dashboard;
