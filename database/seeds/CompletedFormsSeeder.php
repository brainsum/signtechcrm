<?php

use Illuminate\Database\Seeder;
use App\Models\CompletedForm;

class CompletedFormsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $forms = [
            'A Flat in Time Short Term Company Booking Form',
            'AAISP / IPS TAG Change Delete Request (.uk domains) and this is my new headers name just for Mate to test and play with this shi',
            'AXA PPP International - International self-certification form',
            'Adult Application',
            'Advantage Learning Course Participant Booking Form',
            'Affiliate Relations Department',
            'Cash Medical History',
            'College of Staten Island - APPLICATION FOR GRADUATE STUDIES TRANSFER CREDIT',
            'CUNYfirst HCM User Access Request Form',
            'IAIR 2013 - Conference Booking Form at 4 July 2013',
        ];

        $lastDate = time();

        for($i = 0; $i < 1000; $i++) {
            $completedForm = new CompletedForm;
            $completedForm->form_id = 1;
            $completedForm->title = $forms[array_rand($forms)];
            $completedForm->completed_at = date('Y-m-d H:i:s', $lastDate - rand(0, 60 * 60 * 3));
            $completedForm->data = [];
            $completedForm->file = 'blank.pdf';
            $completedForm->save();
        }
    }
}
