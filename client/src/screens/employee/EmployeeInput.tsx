import React, { useState } from 'react';
import { formDate, axiosReq } from '../../api';

import TabInputHeader from '../../components/TabInputHeader';
import { employeeInputHeaders } from '../../constants/headers';
import ArrowBack from '../../components/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useCustomQueries } from '../../hooks/useCustomQuery';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  Container,
  Divider,
  Autocomplete,
  SelectChangeEvent,
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import 'dayjs/locale/ko';

import Blank from '../../components/Blank';
dayjs.locale('ko');

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '& .MuiTextField-root, & .MuiFormControl-root': {
    marginBottom: theme.spacing(2),
  },
}));

const StyledFormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: '8px',
  marginBottom: theme.spacing(2),
}));

function EmployeeInput() {
  const [username, setName] = useState<string | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<
    Array<{ id: string; destination: string } | null>
  >([null, null, null]);
  const [selectedBusinesses, setSelectedBusinesses] = useState<
    Array<{ business: string } | null>
  >([null, null, null]);

  const [selectedWorks, setSelectedWorks] = useState<
    Array<{ work: string } | null>
  >([null, null, null]);

  const [inputDestination, setInputDestination] = useState('');

  const [inputBusiness, setInputBusiness] = useState('');

  const [inputWork, setInputWork] = useState(''); // 업무 직접 입력은 아니지만 직접 입력한 방문지와 사업명의 매핑하기 위한 변수

  const [car, setCar] = useState<string | null>(null);

  // 0 : 기본 1 : 일일 업무 2: 여러 날은 아니지만 다른 날 선택 3: 기간선택
  const [isDaily, setIsDaily] = useState(0);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const navigate = useNavigate();
  const {
    names,
    namesLoading,
    destinationsData,
    destinationsLoading,
    businessesData,
    businessesLoading,
    workData,
    worksLoading,
    cars,
    carsLoading,
  } = useCustomQueries();

  const destinationOptions = [
    { id: 'none', destination: '선택 안함' },
    ...(destinationsData
      ?.sort((a, b) => a.destination.localeCompare(b.destination))
      ?.map((item) => ({
        id: item._id,
        destination: item.destination,
      })) || []),
  ];
  const workOptions = [
    ...(workData
      ?.sort((a, b) => a.work.localeCompare(b.work))
      .map((item) => ({
        work: item.work,
      })) || []),
  ];

  const getBusinessOptions = (destinationId: string) => {
    if (destinationId === 'none') {
      return [{ business: '선택 안함' }];
    }
    return (
      businessesData
        ?.filter((business) => business.destinationId === destinationId)
        .sort((a, b) => a.business.localeCompare(b.business))
        .map((item) => ({
          business: item.business,
        })) || []
    );
  };

  const handleNameChange = (
    event: React.SyntheticEvent,
    username: string | null
  ) => {
    setName(username);
  };

  const handleDestinationChange =
    (index: number) =>
    (
      event: React.SyntheticEvent,
      newValue: { id: string; destination: string } | null
    ) => {
      const newDestinations = [...selectedDestinations];
      newDestinations[index] = newValue;
      setSelectedDestinations(newDestinations);

      // Reset corresponding business when destination changes
      const newBusinesses = [...selectedBusinesses];
      newBusinesses[index] = null;
      setSelectedBusinesses(newBusinesses);
    };

  const handleBusinessChange =
    (index: number) =>
    (event: React.SyntheticEvent, newValue: { business: string } | null) => {
      const newBusinesses = [...selectedBusinesses];
      newBusinesses[index] = newValue;
      setSelectedBusinesses(newBusinesses);
    };

  const handleWorkChange =
    (index: number) =>
    (event: React.SyntheticEvent, newValue: { work: string } | null) => {
      const newWorks = [...selectedWorks];
      newWorks[index] = newValue;
      setSelectedWorks(newWorks);
    };

  const handleCarChange = (event: React.SyntheticEvent, car: string | null) => {
    setCar(car);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt((event.target as HTMLInputElement).value);
    setIsDaily(value);
    if (value === 1) {
      setStartDate(new Date());
      setEndDate(new Date());
    }
    //const value = parseInt(event.target.value);
  };

  const handleDiffDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setStartDate(newDate.toDate());
      setEndDate(newDate.toDate());
    }
  };

  /* 일일 업무 아닌 경우 시작 날짜와 종료 날짜 설정 */

  const handleStartDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setStartDate(new Date(newDate.toDate()));
    }
  };
  const handleEndDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setEndDate(new Date(newDate.toDate()));
    }
  };

  if (
    namesLoading ||
    destinationsLoading ||
    businessesLoading ||
    worksLoading ||
    carsLoading
  ) {
    return <div>Loading...</div>;
  }

  const onClickComplete = async () => {
    const destArr = selectedDestinations
      .filter(
        (dest): dest is { id: string; destination: string } => dest !== null
      )
      .map((dest) => dest.destination)
      .concat(inputDestination.trim())
      .filter(Boolean);

    const businessArr = selectedBusinesses
      .filter((bus): bus is { business: string } => bus !== null)
      .map((bus) => bus.business)
      .concat(inputBusiness.trim())
      .filter(Boolean);

    const workArr = selectedWorks
      .filter((item): item is { work: string } => item !== null)
      .map((item) => item.work)
      .concat(inputWork.trim())
      .filter(Boolean);

    if (!username) {
      alert('이름을 선택해주세요');
      return;
    }

    if (destArr.length === 0) {
      alert('방문지를 선택해주세요');
      return;
    }

    if (businessArr.length === 0) {
      alert('사업명을 선택해주세요');
      return;
    }
    if (destArr.length !== businessArr.length) {
      alert('방문지와 사업명의 수가 일치하지 않습니다');
      return;
    }

    if (workArr.length === 0) {
      alert('업무를 선택해주세요');
      return;
    }
    if (
      destArr.length === businessArr.length &&
      destArr.length > workArr.length
    ) {
      alert('업무를 선택해주세요');
      return;
    }
    if (
      destArr.length === businessArr.length &&
      destArr.length < workArr.length
    ) {
      alert('업무의 개수가 많습니다');
      return;
    }

    if (!car) {
      alert('차량을 선택해주세요');
      return;
    }
    if (startDate && endDate && startDate > endDate) {
      alert('시작일이 종료일보다 느립니다.');
      return;
    }

    const requests = destArr.map((destination, index) =>
      axiosReq.post('/api/employee-inform/addInform', {
        username,
        destination: destArr[index],
        business: businessArr[index],
        work: workArr[index],
        car,
        startDate: isDaily === 1 ? new Date() : startDate,
        endDate: isDaily === 1 ? new Date() : endDate,
        isDaily,
      })
    );

    const responses = await Promise.all(requests);

    if (responses.every((res) => res.status === 200)) {
      alert('정보 입력 완료');
      navigate('/employee-status');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <div className="flex items-center justify-between w-full mt-2 mb-8 sm:mt-4">
        <ArrowBack type="not home" />
        <span className="font-bold sm:text-sm md:text-3xl md:mx-8 sm:mx-1 whitespace-nowrap">
          {formDate}
        </span>
        <Blank />
      </div>

      <StyledPaper elevation={3}>
        <Grid container spacing={3}>
          {/* 기본 정보 섹션 */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              근무 현황
            </Typography>
            <Grid container spacing={2}>
              {/* 날짜 선택 섹션 */}
              <Grid item xs={12} sm={6} md={4}>
                <FormControl component="fieldset" fullWidth>
                  {isDaily === 2 ? (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="ko"
                    >
                      <MobileDatePicker
                        onChange={handleDiffDateChange}
                        sx={{
                          width: '100%',
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                          },
                        }}
                        label="날짜 *"
                      />
                    </LocalizationProvider>
                  ) : (
                    isDaily === 3 && (
                      <div className="flex space-x-2">
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          adapterLocale="ko"
                        >
                          <MobileDatePicker
                            onChange={handleStartDateChange}
                            sx={{
                              width: '100%',
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                              },
                            }}
                            label="시작일 *"
                          />
                          <MobileDatePicker
                            onChange={handleEndDateChange}
                            sx={{
                              width: '100%',
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                              },
                            }}
                            label="종료일 *"
                          />
                        </LocalizationProvider>
                      </div>
                    )
                  )}
                  <RadioGroup
                    className="flex"
                    row
                    value={isDaily}
                    onChange={handleDateChange}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="오늘"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="다른날"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="기간 선택"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  options={names?.map((item) => item.username) || []}
                  renderInput={(params) => (
                    <TextField {...params} label="이름 *" />
                  )}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  options={cars?.map((item) => item.car) || []}
                  renderInput={(params) => (
                    <TextField {...params} label="차량 *" />
                  )}
                  onChange={handleCarChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 3 }} />
          </Grid>

          {/* 상세 정보 섹션 */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* 방문지 섹션 */}
              <Grid item xs={12} md={4}>
                <StyledFormSection>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    방문지
                  </Typography>
                  {[0, 1, 2].map((index) => (
                    <Autocomplete
                      key={index}
                      options={destinationOptions}
                      getOptionLabel={(option) => option.destination}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`방문지${index + 1} ${index === 0 ? '*' : ''}`}
                          sx={{ mb: 2 }}
                        />
                      )}
                      onChange={handleDestinationChange(index)}
                      value={selectedDestinations[index]}
                    />
                  ))}
                  <TextField
                    fullWidth
                    label="방문지 직접 입력"
                    value={inputDestination}
                    onChange={(e) => setInputDestination(e.target.value)}
                  />
                </StyledFormSection>
              </Grid>

              {/* 사업명 섹션 */}
              <Grid item xs={12} md={4}>
                <StyledFormSection>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    사업명
                  </Typography>
                  {[0, 1, 2].map((index) => (
                    <Autocomplete
                      key={index}
                      options={getBusinessOptions(
                        selectedDestinations[index]?.id || 'none'
                      )}
                      getOptionLabel={(option) => option.business}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`사업명${index + 1} ${index === 0 ? '*' : ''}`}
                          sx={{ mb: 2 }}
                        />
                      )}
                      onChange={handleBusinessChange(index)}
                      value={selectedBusinesses[index]}
                      disabled={!selectedDestinations[index]}
                      isOptionEqualToValue={(option, value) =>
                        option.business === value?.business
                      }
                    />
                  ))}
                  <TextField
                    fullWidth
                    label="사업명 직접 입력"
                    value={inputBusiness}
                    onChange={(e) => setInputBusiness(e.target.value)}
                  />
                </StyledFormSection>
              </Grid>

              {/* 업무 섹션 */}
              <Grid item xs={12} md={4}>
                <StyledFormSection>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    업무
                  </Typography>
                  {[0, 1, 2].map((index) => (
                    <Autocomplete
                      key={index}
                      options={workOptions}
                      getOptionLabel={(option) => option.work}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`업무${index + 1} ${index === 0 ? '*' : ''}`}
                          sx={{ mb: 2 }}
                        />
                      )}
                      onChange={handleWorkChange(index)}
                      value={selectedWorks[index]}
                      isOptionEqualToValue={(option, value) =>
                        option?.work === value?.work
                      }
                    />
                  ))}
                  <TextField
                    fullWidth
                    label="업무 직접 입력"
                    value={inputWork}
                    onChange={(e) => setInputWork(e.target.value)}
                  />
                </StyledFormSection>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* 완료 버튼 */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={onClickComplete}
            sx={{
              height: '48px',
              fontSize: '1.1rem',
              bgcolor: '#00ab39',
              '&:hover': {
                bgcolor: '#009933',
              },
            }}
          >
            입력 완료
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
}

export default EmployeeInput;
