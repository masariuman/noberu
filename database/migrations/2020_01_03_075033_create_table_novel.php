<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableNovel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('novel', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('url');
            $table->string('title')->nullable();
            $table->longText('content')->nullable();
            $table->text('thumbnail')->nullable();
            $table->string('thumbnail_desc')->nullable();
            $table->enum('status',[1,0,2])->default(1);
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
        Schema::dropIfExists('novel');
    }
}
