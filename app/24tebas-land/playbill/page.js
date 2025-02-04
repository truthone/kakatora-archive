'use client';
import React, { useState } from 'react';
import { Flex, Container, Theme, Box } from '@radix-ui/themes';
import styled from 'styled-components';
import ScheduleCalendar from '../../../components/ScheduleCalendar';

export default function PlaybillPage() {
  return (
    <Box>
      <Theme accentColor="indigo">
        <ScheduleCalendar />
      </Theme>
    </Box>
  );
}
