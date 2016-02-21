<?php

namespace App;

use Laravel\Cashier\Billable ;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use Billable ;
    protected $fillable = ['first_name', 'last_name','email'];
}
