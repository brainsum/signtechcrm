<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompletedFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('completed_forms', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('form_id');
            $table->string('title', 255);
            $table->text('data');
            $table->string('file', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('completed_forms');
    }
}
