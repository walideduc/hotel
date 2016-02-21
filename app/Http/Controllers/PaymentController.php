<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
    function pay(Request $request){
        $token = $request['token'];
        $customer_id = $request['customer_id'];
        $total_price= $request['total'] * 100 ;

        $customer = Customer::find($customer_id);

        if($customer->charge($total_price,['source' => $token,'receipt_email' => $customer->email])){
          $message = ['status'=>'OK','message'=>'Payment OK'];
            return $message ;
        }else{
            $message = ['status' => 'Error','message'=>'Error submitting payment'];
            return $message ;
        }
    }
    //
}
