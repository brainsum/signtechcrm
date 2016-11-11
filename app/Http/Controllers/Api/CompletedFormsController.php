<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class CompletedFormsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Just generate some fake data temporary
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

        $items = [];
        for ($i = 0; $i < 15; $i++) {
            $items[] = [
                'title' => $forms[array_rand($forms)],
                'completedAt' => date('Y-m-d H:i', rand(time() , time() - 60 * 60 * 24 * 14))
            ];
        }

        return $items;
    }
}
