import Assesment from '@/components/Accountant/Assesment'
import PageHero from '@/components/shared/PageHero'
import React from 'react'

const MyAccountant = () => {
  return (
    <div>
      <PageHero
        title="Find the Right Accountant for Your Needs"
        subtitle="Complete our assessment, book a 30-minute consultation, and receive quotes from at least two suitable firms — then choose the right accountant for you."
        subtitleMaxWidth="max-w-[1190px]"
      />
      <Assesment />
    </div>
  )
}

export default MyAccountant